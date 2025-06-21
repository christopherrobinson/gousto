/**
 * Normalises category names with special case handling
 */
export const normaliseCategoryName = (category: string): string => {
  const trimmedCategory = category.trim().replace(/ recipes$/i, '').trim();

  // Find matching normalisation rule
  for (const [normalised, variants] of mergedCategories) {
    if (variants.includes(trimmedCategory)) {
      return normalised;
    }
  }

  return trimmedCategory;
};
