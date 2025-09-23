import { type APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const { ingredients, page } = Object.fromEntries(url.searchParams);

    let recipes: any[] | null = [];
    let error: string = '';
    let totalResults = 0;
    let totalPages = 0;

    const res = await getRecipesFromSupabase({
      filters: {
        ingredients: ingredients,
      },
      page: Number(page) || 1,
    });

    totalResults = res.total;
    totalPages = Math.ceil(totalResults / recipesPerPage);

    recipes = res.recipes ?? [];

    error = res.error?.message
      ? String(res.error.message)
      : (recipes?.length === 0 ? 'No recipes found.' : '');

    const response = recipes?.map(({ cuisine, image, prep_time_minutes, rating, url, title }) => ({
      cuisine: cuisine,
      id: url,
      image: image,
      prep_time_minutes: prep_time_minutes,
      rating: rating,
      title: title,
    }));

    return new Response(JSON.stringify(response), {
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
