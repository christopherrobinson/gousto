export const getIngredients = async () => {
  const cacheKey = 'all-ingredients';

  // Check cache first
  const cached = ingredientCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const recipes = await getRecipes();
  const ingredientMap = new Map<string, typeof recipes[0]['data']['ingredients'][0]>();

  recipes.forEach(({ data }) => {
    const { ingredients, portion_sizes } = data;

    if (!ingredients || !portion_sizes) {
      return;
    }

    const portionForTwo = portion_sizes.find(p => p.portions === 2);

    if (!portionForTwo?.ingredients_skus) {
      return;
    }

    const validIds = new Set(portionForTwo.ingredients_skus.map(sku => sku.id));

    for (let i = 0; i < ingredients.length; i++) {
      const ingredient = ingredients[i];

      if (validIds.has(ingredient.gousto_uuid)) {
        ingredientMap.set(ingredient.gousto_uuid, ingredient);
      }
    }
  });

  const result = Array.from(ingredientMap.values()).sort((a, b) => a.label.localeCompare(b.label));

  // Store in cache
  ingredientCache.set(cacheKey, result);

  return result;
};
