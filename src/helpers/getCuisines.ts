let cuisineCache: { name: string; recipes: number, slug: string }[] | null = null;

export const getCuisines = async () => {
  if (cuisineCache) {
    return cuisineCache;
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

  cuisineCache = entries
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => ({
      name: name,
      recipes: count,
      slug: `/recipes/cuisine/${createSlug(name)}/`,
    }));

  return cuisineCache;
};
