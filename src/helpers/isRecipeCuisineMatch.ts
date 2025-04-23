export const isRecipeCuisineMatch = (recipe: Recipe, cuisine: string): boolean => {
  const recipeCuisine = recipe?.data?.cuisine;

  // Early return if the recipe doesn't have a cuisine
  if (!recipeCuisine) {
    return false;
  }

  return createSlug(recipeCuisine) === createSlug(cuisine);
};


type Recipe = {
  data?: {
    cuisine?: string;
  };
};
