export const isRecipeCuisineMatch = (recipe: Recipe, cuisine: string): boolean => {
  if (!recipe?.data?.cuisine)
    return false;

  return createSlug(recipe.data.cuisine) === createSlug(cuisine);
}

type Recipe = {
  data?: {
    cuisine?: string;
  };
};
