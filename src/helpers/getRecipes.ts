let recipeCache: any[] | null = null;

export const getRecipes = async (limit?: number, prepTime?: number | { min?: number; max?: number }) => {
  if (!recipeCache) {
    recipeCache = ((await getCollection('recipes'))
      // Filter out recipes without cooking instructions
      .filter(({ data }) =>Array.isArray(data.cooking_instructions) && data.cooking_instructions.length > 0)
      // Filter by prep_times.for_2 based on the input
      .filter(({ data }) => {
        const time = data.prep_times?.for_2;

        if (typeof time !== 'number') {
          return false;
        }

        if (prepTime === undefined) {
          return true;
        }

        if (typeof prepTime === 'number') {
          return time === prepTime;
        }

        const { min, max } = prepTime;

        if (min !== undefined && time < min) return false;
        if (max !== undefined && time > max) return false;

        return true;
      })
      // Sort by gousto_id descending
      .sort((a, b) => parseInt(b.data.gousto_id, 10) - parseInt(a.data.gousto_id, 10))
    );
  }

  return typeof limit === 'number' ? recipeCache.slice(0, limit) : recipeCache;
};
