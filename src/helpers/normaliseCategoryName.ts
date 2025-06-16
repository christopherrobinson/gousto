/**
 * Normalises category names with special case handling
 */
export const normaliseCategoryName = (category: string): string => {
  const trimmedCategory = stripRecipeSuffix(category.trim());

  // Define normalisation rules as a map for better maintainability
  const normalisationRules = new Map([
    ['Chicken',          ['Chicken', 'Chicken Breast', 'Chicken Thigh']],
    ['Christmas',        ['Christmas', 'Christmas Inspired']],
    ['Dairy-Free',       ['Dairy-Free', 'Dairy Free']],
    ['Easter',           ['Easter', 'Easter 2']],
    ['Father\'s Day',    ['Father\'s Day', 'Father\'s Day 2']],
    ['Festive Flavours', ['Festive Flavours', 'Festive Flavours 2019']],
    ['Gluten-Free',      ['Gluten-Free', 'Gluten Free']],
    ['Plant-Based',      ['Plant-Based', 'Plant Bistro']],
    ['Pork',             ['Pork', 'Pork Fillet']]
  ]);

  // Find matching normalisation rule
  for (const [normalised, variants] of normalisationRules) {
    if (variants.includes(trimmedCategory)) {
      return normalised;
    }
  }

  return stripRecipeSuffix(trimmedCategory);
};
