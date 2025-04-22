export const getUniqueCuisines = async () => {
  const recipes = await getRecipes();

  const cuisines = [...new Set(
    recipes.map(recipe => recipe.data.cuisine).filter(Boolean)
  )];

  return cuisines;
}
