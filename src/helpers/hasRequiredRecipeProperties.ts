/**
 * Validates if a recipe object has required properties
 */
export const hasRequiredRecipeProperties = (data: any): boolean => {
  return (
    isNonEmptyString(data?.title) &&
    isNonEmptyArray(data?.ingredients) &&
    isNonEmptyArray(data?.cooking_instructions) &&
    isValidNumber(data?.prep_times?.for_2)
  );
};
