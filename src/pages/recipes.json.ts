import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  const recipes = await getRecipes();
  const recipesJSON = recipes.map(({ data, id }) => ({
    cuisine: data.cuisine,
    description: data.description,
    id: id,
    image: data.image,
    prep_times: data.prep_times,
    rating: data.rating,
    title: data.title,
  }));

  return new Response(JSON.stringify(recipesJSON), {
    headers: { 'Content-Type': 'application/json' },
  });
}
