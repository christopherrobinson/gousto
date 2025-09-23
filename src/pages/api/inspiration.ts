import { type APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const recipes = await getRandomRecipes(inspirationRecipeCount);

    return new Response(JSON.stringify(recipes), {
      headers: {
        'Cache-Control': 'public, max-age=604800, s-maxage=604800',
        'Content-Type': 'application/json',
      },
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve recipes.' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
