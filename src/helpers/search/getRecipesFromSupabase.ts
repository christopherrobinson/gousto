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

  if (error || !data || !Array.isArray(data.results)) {
    console.error('Supabase RPC error:', error);

    return {
      cuisines: [],
      error,
      recipes: [],
      total: 0,
    };
  }

  const recipes = data.results.map((entry) => entry.recipe);
  const total = data.results[0]?.total_count ?? 0;

  const cuisines = (data.all_cuisines ?? []).map((cuisine) => ({
    label: cuisine,
    value: cuisine.toLowerCase(),
  })).sort((a, b) => a.label.localeCompare(b.label));

  return {
    error: null,
    cuisines,
    recipes,
    total,
  };
};
