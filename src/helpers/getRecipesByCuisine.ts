export const getRecipesByCuisine = async (cuisine: string) => {
  const cacheKey = createCacheKey('recipes-by-cuisine', cuisine);

  // Check if we have cached results for this cuisine
  const cached = recipeCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  // Get all recipes and filter by cuisine
  const recipes = await getRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.data.cuisine === cuisine);

  // Cache the result
  recipeCache.set(cacheKey, filteredRecipes);

  return filteredRecipes;
};
