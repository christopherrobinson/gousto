export const getCuisines = async () => {
  const cacheKey = 'all-cuisines';

  // Check cache first
  const cached = cuisineCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const recipes = await getRecipes();

  const recipesCount = recipes.reduce((map, { data }) => {
    const cuisine = data.cuisine;

    if (typeof cuisine === 'string') {
      map.set(cuisine, (map.get(cuisine) || 0) + 1);
    }

    return map;
  }, new Map<string, number>());

  const entries = Array.from(recipesCount.entries()) as [string, number][];

  const result = entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => ({
      name: name,
      recipes: count,
      slug: `/recipes/cuisine/${createSlug(name)}/`,
    }));

  // Store in cache
  cuisineCache.set(cacheKey, result);

  return result;
};
