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

  const result = supabaseClient
    .from('recipes')
    .select('*', { count: 'exact' })
    .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
    .range(from, to);

  switch (sort) {
    case 'name_asc':
      result.order('title', { ascending: true });
      break;
    case 'name_desc':
      result.order('title', { ascending: false });
      break;
    case 'rating':
      result.order('rating->>average', { ascending: false, nullsFirst: false, });
      break;
    default:
      result.order('gousto_id', { ascending: false });
  }

  if (filters.cuisine) {
    result.ilike('cuisine', filters.cuisine);
  }

  if (filters.time) {
    const timeField = 'prep_times->>for_2';

    if (filters.time === '>60') {
      result.gte(timeField, 60);
    }
    else {
      result.lte(timeField, Number(filters.time));
    }
  }

  return await result;
};
