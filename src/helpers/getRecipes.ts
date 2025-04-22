export const getRecipes = async () =>
    (await getCollection('recipes'))
      .sort((a, b) => parseInt(b.data.gousto_id) - parseInt(a.data.gousto_id));
