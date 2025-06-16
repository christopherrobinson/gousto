let cuisineRecipeCache: { [key: string]: any[] } = {};

export const getRecipesByCuisine = async (cuisine: string) => {
  // Check if we have cached results for this cuisine
  if (cuisineRecipeCache[cuisine]) {
    return cuisineRecipeCache[cuisine];
  }

  // Get all recipes and filter by cuisine
  const recipes = await getRecipes();
  const filteredRecipes = recipes.filter(recipe => recipe.data.cuisine === cuisine);

  // Cache the result
  cuisineRecipeCache[cuisine] = filteredRecipes;

  return filteredRecipes;
};
