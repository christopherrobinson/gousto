type GetRecipesOptions = {
  categories?: string[];
  cuisine?: string;
  ingredients?: string[];
  limit?: number;
  prepTime?: number | { max?: number; min?: number; };
  randomise?: boolean;
  rating?: { average?: number; total?: number; };
  recipes?: string[];
};

// Base recipe cache for all recipes
let baseRecipeCache: any[] | null = null;

export const getRecipes = async (options: GetRecipesOptions = {}) => {
  const { limit, prepTime, categories, cuisine, ingredients, rating, recipes } = options;

  // Create cache key for this specific query
  const cacheKey = createCacheKey(
    'recipes',
    JSON.stringify(categories?.sort()),
    cuisine,
    JSON.stringify(ingredients?.sort()),
    typeof prepTime === 'object' ? JSON.stringify(prepTime) : prepTime,
    typeof rating === 'object' ? JSON.stringify(rating) : rating,
    JSON.stringify(recipes?.sort()),
    limit,
    options.randomise ? 'random' : 'ordered'
  );

  // Check if we have cached results for this exact query
  const cachedResult = recipeCache.get(cacheKey);

  if (cachedResult) {
    return cachedResult;
  }

  // Load base recipe data if not already loaded
  if (!baseRecipeCache) {
    const allRecipes = await getCollection('recipes');
    const validRecipes = allRecipes.filter(isValidRecipe);
    const deduplicatedRecipes = deduplicateRecipesByTitle(validRecipes, true);

    baseRecipeCache = deduplicatedRecipes.sort((a, b) => parseInt(b.data.gousto_id, 10) - parseInt(a.data.gousto_id, 10));
  }

  // Use the reusable filter utility for cleaner, more maintainable code
  const recipeFilter = createRecipeFilter({
    prepTime,
    cuisine,
    categories,
    ingredients,
    rating
  });

  let filteredRecipes = baseRecipeCache.filter(recipeFilter);

  if (recipes) {
    const recipeIds = Array.isArray(recipes) ? recipes : [recipes];
    const idSet = new Set(recipeIds);

    filteredRecipes = filteredRecipes.filter(recipe => idSet.has(recipe.id));
    filteredRecipes.sort((a, b) => recipeIds.indexOf(a.id) - recipeIds.indexOf(b.id));
  }

  if (options.randomise) {
    filteredRecipes = shuffleArray(filteredRecipes);
  }

  // Apply limit if provided
  const result = typeof limit === 'number' ? filteredRecipes.slice(0, limit) : filteredRecipes;

  // Cache the result for future use (don't cache randomised results)
  if (!options.randomise) {
    recipeCache.set(cacheKey, result);
  }

  return result;
};
