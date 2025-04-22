export const getRecipes = async () => {
  return (await getCollection('recipes'))
    // filter out recipes without cooking instructions
    .filter(recipe => recipe.data.cooking_instructions?.length)
    // sort by gousto_id descending
    .sort((a, b) => parseInt(b.data.gousto_id) - parseInt(a.data.gousto_id));
};
