export const getUniqueCuisines = async () => {
  const recipes = await getRecipes();

  // Use reduce to collect unique cuisines
  const cuisines = recipes.reduce((set, { data }) => {
    const cuisine = data.cuisine;

    if (cuisine) {
      set.add(cuisine);
    }

    return set;
  }, new Set<string>());

  return Array.from(cuisines);
};
