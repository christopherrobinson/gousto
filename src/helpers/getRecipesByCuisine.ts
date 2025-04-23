let cuisineCache: Map<string, any[]> = new Map();
let isCachePopulated = false; // Track if cache is populated

export const getRecipesByCuisine = async (cuisine: string) => {
  // If the cache is populated, just return the data
  if (isCachePopulated) {
    return cuisineCache.get(cuisine) || [];
  }

  // Cache hasn't been populated yet, so populate the cache first
  const recipes = await getRecipes();

  // Group recipes by cuisine once
  recipes.forEach(recipe => {
    const cuisineKey = recipe.data.cuisine;

    if (cuisineKey) {
      if (!cuisineCache.has(cuisineKey)) {
        cuisineCache.set(cuisineKey, []);
      }

      cuisineCache.get(cuisineKey)?.push(recipe);
    }
  });

  // Mark the cache as populated after the first pass
  isCachePopulated = true;

  // Return the filtered recipes for the requested cuisine
  return cuisineCache.get(cuisine) || [];
};
