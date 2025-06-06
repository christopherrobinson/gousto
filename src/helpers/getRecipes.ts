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

let recipeCache: any[] | null = null;

export const getRecipes = async (options: GetRecipesOptions = {}) => {
  const { limit, prepTime, categories, cuisine, ingredients, rating, recipes } = options;

  if (!recipeCache) {
    const allRecipes = await getCollection('recipes');
    const validRecipes = allRecipes.filter(isValidRecipe);
    const deduplicatedRecipes = deduplicateRecipesByTitle(validRecipes, true);

    recipeCache = deduplicatedRecipes.sort((a, b) => parseInt(b.data.gousto_id, 10) - parseInt(a.data.gousto_id, 10));
  }

  // Dynamic filtering on cached recipes
  let filteredRecipes = recipeCache.filter(({ data }) => {
    if (typeof prepTime === 'number') {
      if (data.prep_times?.for_2 !== prepTime) {
        return false;
      }
    }
    else if (prepTime && typeof prepTime === 'object') {
      const { min, max } = prepTime;
      const time = data.prep_times?.for_2;

      if (min !== undefined && time < min) {
        return false;
      }

      if (max !== undefined && time > max) {
        return false;
      }
    }

    // Filter by Category
    if (categories && categories.length > 0) {
      if (!Array.isArray(data.categories) || !data.categories.some(category => categories.includes(category))) {
        return false;
      }
    }

    // Filter by Cuisine
    if (cuisine) {
      if (typeof data.cuisine !== 'string' || data.cuisine !== cuisine) {
        return false;
      }
    }

    // Filter by Ingredients
    if (ingredients && ingredients.length > 0) {
      if (
        !Array.isArray(data.ingredients) ||
        !ingredients.every(searchTerm =>
          data.ingredients.some(ingredient =>
            typeof ingredient.label === 'string' && ingredient.label.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      ) {
        return false;
      }
    }

    // Filter by Rating if provided (supports both object { average: x } or direct number)
    if (typeof rating === 'number') {
      const averageRating = data.rating?.average;

      if (typeof averageRating !== 'number' || averageRating < rating) {
        return false;
      }
    }
    else if (rating?.average !== undefined) {
      const averageRating = data.rating?.average;

      if (typeof averageRating !== 'number' || averageRating < rating.average) {
        return false;
      }
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
  return typeof limit === 'number' ? filteredRecipes.slice(0, limit) : filteredRecipes;
};
