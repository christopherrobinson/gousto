export const getRecipes = async () => {
  return (await getCollection('recipes'))
    // filter out recipes without cooking instructions
    .filter(({ data }) => Array.isArray(data.cooking_instructions) && data.cooking_instructions.length > 0)
    // sort by gousto_id descending
    .sort((a, b) => parseInt(b.data.gousto_id) - parseInt(a.data.gousto_id));
};
