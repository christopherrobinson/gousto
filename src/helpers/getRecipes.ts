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
  const { categories, cuisine, ingredients, prepTime, randomise, rating, recipes } = options;

  if (!recipeCache) {
    const allRecipes = await getCollection('recipes');
    const validRecipes = allRecipes.filter(isValidRecipe);
    const deduplicatedRecipes = deduplicateRecipes(validRecipes, true);

    recipeCache = deduplicatedRecipes.sort((a, b) => parseInt(b.data.gousto_id, 10) - parseInt(a.data.gousto_id, 10));
  }

  // Use the reusable filter utility for cleaner, more maintainable code
  const recipeFilter = createRecipeFilter({
    prepTime,
    cuisine,
    categories,
    ingredients,
    rating
  });

  // Dynamic filtering on cached recipes - single pass for better performance
  let filteredRecipes = recipeCache?.filter(recipeFilter);

  if (recipes) {
    const recipeIds = Array.isArray(recipes) ? recipes : [recipes];
    const idSet = new Set(recipeIds);

    filteredRecipes = filteredRecipes?.filter(recipe => idSet.has(recipe.id));
    filteredRecipes?.sort((a, b) => recipeIds.indexOf(a.id) - recipeIds.indexOf(b.id));
  }

  if (randomise) {
    filteredRecipes = shuffleArray(filteredRecipes);
  }

  // Apply limit if provided
  return (typeof options.limit === 'number') ? filteredRecipes?.slice(0, options.limit) : filteredRecipes;
};
