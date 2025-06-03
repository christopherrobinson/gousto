export const isValidRecipe = (recipe: { data: any }): boolean => {
  const { data } = recipe;

  // Don't include recipes in the "Oven Ready" category
  if (Array.isArray(data.categories) && data.categories.includes('Oven Ready')) {
    return false;
  }

  // Must not have a title that starts with "Oven Ready" or "Oven-Ready" (case-insensitive, optional space/hyphen)
  if (typeof data.title === 'string' && (/^oven[- ]ready/.test(data.title.trim().toLowerCase()))) {
    return false;
  }

  // Must have ingredients
  if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
    return false;
  }

  // Must have cooking instructions
  if (!Array.isArray(data.cooking_instructions) || data.cooking_instructions.length === 0) {
    return false;
  }

  // Must have a valid prep time
  if (typeof data.prep_times?.for_2 !== 'number') {
    return false;
  }

  return true;
}
