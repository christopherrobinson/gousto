/**
 * Creates a reusable filter function for recipes
 */
export const createRecipeFilter = (options: {
  prepTime?: number | { min?: number; max?: number };
  cuisine?: string;
  categories?: string[];
  ingredients?: string[];
  rating?: number | { average?: number };
}) => {
  const { prepTime, cuisine, categories, ingredients, rating } = options;

  return (recipe: any): boolean => {
    const { data } = recipe;

    // Filter by prep time
    if (typeof prepTime === 'number') {
      if (data.prep_times?.for_2 !== prepTime) return false;
    }
    else if (prepTime && typeof prepTime === 'object') {
      const { min, max } = prepTime;
      const time = data.prep_times?.for_2;

      if ((min !== undefined && time < min) || (max !== undefined && time > max)) {
        return false;
      }
    }

    // Filter by cuisine
    if (cuisine && (typeof data.cuisine !== 'string' || data.cuisine !== cuisine)) {
      return false;
    }

    // Filter by rating
    const ratingThreshold = typeof rating === 'number' ? rating : rating?.average;

    if (ratingThreshold !== undefined) {
      const averageRating = data.rating?.average;

      if (!isValidNumber(averageRating) || averageRating < ratingThreshold) {
        return false;
      }
    }

    // Filter by categories
    if (categories && categories.length > 0) {
      if (!isNonEmptyArray(data.categories) || !data.categories.some((category: string) => categories.includes(category))) {
        return false;
      }
    }

    // Filter by ingredients (most expensive - do last)
    if (ingredients && ingredients.length > 0) {
      if (!isNonEmptyArray(data.ingredients)) {
        return false;
      }

      const lowerSearchTerms = ingredients.map(term => normaliseText(term));

      return lowerSearchTerms.every(searchTerm =>
        data.ingredients.some((ingredient: any) =>
          isNonEmptyString(ingredient.label) && normaliseText(ingredient.label).includes(searchTerm)
        )
      );
    }

    return true;
  };
};
