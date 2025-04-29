let cuisineCache: { name: string; slug: string }[] | null = null;

export const getCuisines = async () => {
  if (cuisineCache) {
    return cuisineCache;
  }

  const recipes = await getRecipes();

  const cuisines = recipes.reduce((set, { data }) => {
    const cuisine = data.cuisine;

    if (typeof cuisine === 'string') {
      set.add(cuisine);
    }

    return set;
  }, new Set<string>());

  cuisineCache = Array.from(cuisines)
    .sort((a, b) => a.localeCompare(b))
    .map(name => ({
      name,
      slug: `/recipes/cuisine/${createSlug(name)}/`
    }));

  return cuisineCache;
};
