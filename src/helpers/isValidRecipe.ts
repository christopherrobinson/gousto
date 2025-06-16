export const isValidRecipe = (recipe: { data: any }): boolean => {
  const { data } = recipe;

  return (
       isNonEmptyString(data?.title)                        // Must have a title
    && (!/^oven[- ]ready/.test(normaliseText(data?.title))) // Title should not start with "Oven Ready" or "Oven-Ready" (case-insensitive, optional space/hyphen)
    && isNonEmptyArray(data?.ingredients)                   // Must have ingredients
    && isNonEmptyArray(data?.cooking_instructions)          // Must have cooking instructions
    && isValidNumber(data?.prep_times?.for_2)               // Must have a prep time for 2
  );
};
