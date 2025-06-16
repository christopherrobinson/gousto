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

  // Dynamic filtering on cached recipes - single pass for better performance
  let filteredRecipes = baseRecipeCache.filter(({ data }) => {
    // Early exit optimisations - check most selective filters first

    // Filter by prep time (likely to be selective)
    if (typeof prepTime === 'number') {
      if (data.prep_times?.for_2 !== prepTime) {
        return false;
      }
    }
    else if (prepTime && typeof prepTime === 'object') {
      const { min, max } = prepTime;
      const time = data.prep_times?.for_2;

      if ((min !== undefined && time < min) || (max !== undefined && time > max)) {
        return false;
      }
    }

    // Filter by cuisine (exact match, fast)
    if (cuisine && (typeof data.cuisine !== 'string' || data.cuisine !== cuisine)) {
      return false;
    }

    // Filter by rating (numeric comparison, fast)
    const ratingThreshold = typeof rating === 'number' ? rating : rating?.average;

    if (ratingThreshold !== undefined) {
      const averageRating = data.rating?.average;

      if (typeof averageRating !== 'number' || averageRating < ratingThreshold) {
        return false;
      }
    }

    // Filter by categories (array operations, more expensive)
    if (categories && categories.length > 0) {
      if (!Array.isArray(data.categories) || !data.categories.some(category => categories.includes(category))) {
        return false;
      }
    }

    // Filter by ingredients (most expensive - string operations)
    if (ingredients && ingredients.length > 0) {
      if (!Array.isArray(data.ingredients)) {
        return false;
      }

      // Pre-compute lowercase search terms for efficiency
      const lowerSearchTerms = ingredients.map(term => term.toLowerCase());

      return lowerSearchTerms.every(searchTerm =>
        data.ingredients.some(ingredient =>
          typeof ingredient.label === 'string' && ingredient.label.toLowerCase().includes(searchTerm)
        )
      );
    }

    return true;
  });

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

  // Cache the result for future use (don't cache randomized results)
  if (!options.randomise) {
    recipeCache.set(cacheKey, result);
  }

  return result;
};
