interface GetRecipesFromSupabaseParams {
  query: string;
  filters: {
    cuisine?: string;
    time?: string;
  };
  page: number;
  sort?: 'name_asc' | 'name_desc' | 'rating';
}

export const getRecipesFromSupabase = async ({
  query,
  filters,
  page,
  sort,
}: GetRecipesFromSupabaseParams) => {
  const from = (page - 1) * recipesPerPage;
  const to = from + recipesPerPage - 1;

  // Base query logic reused for both main + cuisine queries
  const baseFilter = (q: ReturnType<typeof supabaseClient.from>) => {
    q.or(`title.ilike.%${query}%,description.ilike.%${query}%`);

    if (filters.cuisine) {
      q.ilike('cuisine', filters.cuisine);
    }

    if (filters.time) {
      const timeField = 'prep_times->>for_2';

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
    case 'name_asc':
      recipeQuery.order('title', { ascending: true });
      break;
    case 'name_desc':
      recipeQuery.order('title', { ascending: false });
      break;
    case 'rating':
      recipeQuery.order('rating->>average', { ascending: false, nullsFirst: false });
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

  const [recipeResponse, cuisineResponse] = await Promise.all([
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
