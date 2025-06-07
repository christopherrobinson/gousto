import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const { data } = await supabaseClient.rpc('get_random_recipes', { limit_count: inspirationRecipeCount });
    const response = data.map(({ cuisine, image, prep_times, rating, url, title }) => ({
      cuisine: cuisine,
      id: url,
      image: image,
      prep_times: prep_times,
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
