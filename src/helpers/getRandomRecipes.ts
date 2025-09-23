export const getRandomRecipes = async (count: number) => {
  const { data } = await supabaseClient.rpc('get_random_recipes', { limit_count: count });

  const recipes = (data ?? []);

  return recipes.map(({ cuisine, image, prep_time_minutes, rating, url, title }) => ({
    cuisine,
    id: url,
    image,
    prep_time_minutes,
    rating,
    title,
  }));
};
