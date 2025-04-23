export const getUniqueCuisines = async () => {
  const recipes = await getRecipes();
  const cuisineSet = new Set<string>();

  for (const recipe of recipes) {
    const cuisine = recipe.data.cuisine;

    if (cuisine)
      cuisineSet.add(cuisine);
  }

  return Array.from(cuisineSet);
};
