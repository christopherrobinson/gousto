type GetProductsOptions = {
  limit?: number;
  recipe?: {
    data?: {
      description?: string;
      ingredients?: string[];
    };
  };
};

const getRandomFill = (arr: any[], count: number) => [...arr].sort(() => Math.random() - 0.5).slice(0, count);

export const getProducts = async (options: GetProductsOptions = {}) => {
  const products = await getCollection('products');
  const limit = options.limit ?? 6;

  if (!options.recipe) {
    return shuffleArray(products).slice(0, limit);
  }

  const { description, ingredients } = options.recipe.data || {};
  const recipeKeywords = new Set([
    ...(description || '').toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(word => word && !stopWords.has(word)),
    ...extractIngredientKeywords(ingredients || []),
  ]);
  const matched: typeof products = [];
  const unmatched: typeof products = [];

  for (const product of products) {
    const productKeywords = product.data.keywords.map(k => k.toLowerCase());
    const hasMatch = productKeywords.some(k => recipeKeywords.has(k));

    if (hasMatch) {
      matched.push(product);
    } else {
      unmatched.push(product);
    }
  }

  return [
    ...matched,
    ...getRandomFill(unmatched, limit - matched.length)
  ].slice(0, limit);
};
