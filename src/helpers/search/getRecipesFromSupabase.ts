interface GetRecipesFromSupabaseParams {
  query: string;
  filters?: {
    calories?: string;
    cuisine?: string;
    time?: string;
  };
  page: number;
  sort?: 'calories' | 'name_asc' | 'name_desc' | 'rating';
}

export const getRecipesFromSupabase = async ({
  query = '',
  filters,
  page = 1,
  sort,
}: GetRecipesFromSupabaseParams) => {
  const from = (page - 1) * recipesPerPage;
  const to = from + recipesPerPage - 1;

  const baseFilter = (q: ReturnType<typeof supabaseClient.from>) => {
    q.or(`title.ilike.%${query}%,description.ilike.%${query}%,ingredients.ilike.%${query}%`);

    if (filters?.calories) {
      const calorieField = 'nutritional_information->per_portion->energy_kcal';

      if (filters.calories === '>1000') {
        q.gte(calorieField, 1000);
      } else {
        q.lte(calorieField, Number(filters.calories));
      }
    }

    if (filters?.cuisine) {
      q.ilike('cuisine', filters.cuisine);
    }

    if (filters?.time) {
      const timeField = 'prep_times->for_2';

      if (filters.time === '>60') {
        q.gte(timeField, 60);
      } else {
        q.lte(timeField, Number(filters.time));
      }
    }

    return q;
  };

  // Main paginated recipe query
  const recipeQuery = baseFilter(
    supabaseClient.from('recipes').select('*', { count: 'exact' }).range(from, to)
  );

  switch (sort) {
    case 'calories':
      recipeQuery.order('nutritional_information->per_portion->energy_kcal', { ascending: true, nullsFirst: false });
      break;
    case 'name_asc':
      recipeQuery.order('title', { ascending: true });
      break;
    case 'name_desc':
      recipeQuery.order('title', { ascending: false });
      break;
    case 'rating':
      recipeQuery.order('rating->average', { ascending: false, nullsFirst: false });
      break;
    default:
      recipeQuery.order('gousto_id', { ascending: false });
  }

  // Distinct cuisine query (across all returned recipes)
  const cuisineQuery = baseFilter(
    supabaseClient
      .from('recipes')
      .select('cuisine', { distinct: true })
      .neq('cuisine', null)
  );

  const [cuisineResponse, recipeResponse] = await Promise.all([
    cuisineQuery,
    recipeQuery,
  ]);

  // Normalised unique cuisine list (for dropdown filter)
  const cuisines =
    Array.from(
      new Map(
        (cuisineResponse.data ?? [])
          .filter(r => r.cuisine)
          .map(c => [c.cuisine.toLowerCase(), { label: c.cuisine, value: c.cuisine.toLowerCase() }])
      ).values()
    ).sort((a, b) => a.label.localeCompare(b.label));

  return {
    cuisines,
    error: recipeResponse.error || cuisineResponse.error,
    recipes: recipeResponse.data ?? [],
    total: recipeResponse.count ?? 0,
  };
};
