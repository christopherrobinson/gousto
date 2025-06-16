interface GetRecipesFromSupabaseParams {
  query: string;
  filters?: {
    calories?: string;
    cuisine?: string;
    ingredients?: string;
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
  const limit = recipesPerPage;
  const offset = (page - 1) * limit;

  const { data, error } = await supabaseClient.rpc('search_recipes_unaccented', {
    search_text: query,
    calories_filter: nullIfEmpty(filters?.calories),
    cuisine_filter: nullIfEmpty(filters?.cuisine),
    ingredients_filter: nullIfEmpty(filters?.ingredients),
    time_filter: nullIfEmpty(filters?.time),
    result_limit: limit,
    result_offset: offset,
    sort_option: sort ?? null,
  });

  if (error || !Array.isArray(data)) {
    console.error('Supabase RPC error:', error);

    return {
      recipes: [],
      cuisines: [],
      total: 0,
      error,
    };
  }

  const recipes = data.map((entry) => entry.recipe);
  const total = data[0]?.total_count ?? 0;

  const cuisines = Array.from(
    new Map(
      recipes
        .filter(r => r.cuisine)
        .map(c => [c.cuisine.toLowerCase(), { label: c.cuisine, value: c.cuisine.toLowerCase() }])
    ).values()
  ).sort((a, b) => a.label.localeCompare(b.label));

  return {
    recipes,
    cuisines,
    total,
    error: null,
  };
};
