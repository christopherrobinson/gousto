let cuisineCache: Map<string, any[]> = new Map();
let isCuisineCachePopulated = false;

export const getRecipesByCuisine = async (cuisine: string) => {
  if (!isCuisineCachePopulated) {
    const recipes = await getRecipes();

    for (const recipe of recipes) {
      const key = recipe.data.cuisine;

      if (!key)
        continue;

      if (!cuisineCache.has(key))
        cuisineCache.set(key, []);

      cuisineCache.get(key)?.push(recipe);
    }

    isCuisineCachePopulated = true;
  }

  return cuisineCache.get(cuisine) || [];
};
