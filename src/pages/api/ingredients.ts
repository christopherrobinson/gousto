import { type APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async () => {
  try {
    const { data } = await supabaseClient.from('ingredients').select('*', { count: 'exact' });
    const response = data.map(({ name }) => ({ name })).sort((a, b) => a.name.localeCompare(b.name));

    return new Response(JSON.stringify(response), {
      headers: {
        'Cache-Control': 'public, max-age=604800, s-maxage=604800',
        'Content-Type': 'application/json',
      },
    });
  }
  catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to retrieve ingredients.' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
