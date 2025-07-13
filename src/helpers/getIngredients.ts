let ingredientCache: any[] | null = null;

export const getIngredients = async () => {
  if (ingredientCache) {
    return ingredientCache;
  }

  const recipes = await getRecipes();
  const ingredientMap = new Map<string, typeof recipes[0]['data']['ingredients'][0]>();

  recipes.forEach(({ data }) => {
    const { ingredients, portion_sizes } = data;

    if (!ingredients || !portion_sizes) {
      return;
    }

    const portionForTwo = portion_sizes['2'];

    if (!portionForTwo?.ingredients_skus) {
      return;
    }

    const validIds = new Set(portionForTwo.ingredients_skus);

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];

      if (validIds.has(ingredient.gousto_uuid)) {
        ingredientMap.set(ingredient.gousto_uuid, ingredient);
      }
    }
  });

  ingredientCache = Array.from(ingredientMap.values()).sort((a, b) => a.label.localeCompare(b.label));

  return ingredientCache;
};
