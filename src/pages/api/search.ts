import type { APIRoute } from 'astro';
import Fuse from 'fuse.js';

export const prerender = false;

export const GET: APIRoute = async ({ request }) => {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase() || '';

  if (!query) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const recipes = await getRecipes();
  const searchableRecipes = recipes.map(({ data, id }) => ({
    cuisine: data.cuisine,
    description: data.description,
    id: id,
    image: data.image,
    prep_times: data.prep_times,
    rating: data.rating,
    title: data.title,
  }));

  const fuse = new Fuse(searchableRecipes, {
    keys: ['cuisine', 'description', 'prep_times.for_2', 'title'],
    minMatchCharLength: 2,
    threshold: 0.3, // 0 = exact, 1 = very fuzzy
  });

  const results = fuse.search(query).map(result => result.item);

  return new Response(JSON.stringify(results.slice(0, 12)), {
    headers: { 'Content-Type': 'application/json' },
  });
}
