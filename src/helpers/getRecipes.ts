type GetRecipesOptions = {
  limit?: number;
  prepTime?: number | { min?: number; max?: number };
  categories?: string[];
  cuisine?: string;
  ingredients?: string[];
  randomise?: boolean;
};

let recipeCache: any[] | null = null;

export const getRecipes = async (options: GetRecipesOptions = {}) => {
  const { limit, prepTime, categories, cuisine } = options;

  if (!recipeCache) {
    const recipes = await getCollection('recipes');

    recipeCache = recipes
      .filter(({ data }) => {
        // Must have ingredients
        if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
          return false;
        }

        // Must have cooking instructions
        if (!Array.isArray(data.cooking_instructions) || data.cooking_instructions.length === 0) {
          return false;
        }

        // Must have a valid prep time
        const time = data.prep_times?.for_2;
        if (typeof time !== 'number') {
          return false;
        }

        return true;
      })
      .sort((a, b) => parseInt(b.data.gousto_id, 10) - parseInt(a.data.gousto_id, 10));
  }

  // Now dynamically filter based on the options passed in
  let filteredRecipes = recipeCache.filter(({ data }) => {
    // Filter by Prep Time
    if (typeof prepTime === 'number') {
      if (data.prep_times?.for_2 !== prepTime) return false;
    }
    else if (prepTime && typeof prepTime === 'object') {
      const { min, max } = prepTime;
      const time = data.prep_times?.for_2;

      if (min !== undefined && time < min) return false;
      if (max !== undefined && time > max) return false;
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
    if (options.ingredients && options.ingredients.length > 0) {
      if (
        !Array.isArray(data.ingredients) ||
        !options.ingredients.some(searchTerm => (
          data.ingredients.some(ingredient => (
            typeof ingredient.label === 'string' && ingredient.label.toLowerCase().includes(searchTerm.toLowerCase()))
          )
        ))
      ) {
        return false;
      }
    }

    return true;
  });

  if (options.randomise) {
    filteredRecipes = shuffleArray(filteredRecipes);
  }

  // Apply limit if provided
  return typeof limit === 'number' ? filteredRecipes.slice(0, limit) : filteredRecipes;
};
