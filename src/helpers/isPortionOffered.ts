export const isPortionOffered = (portionSizes: IngredientsProps['portion_sizes'], portions: number): boolean => {
  if (!portionSizes)
    return false;

  return portionSizes.find(p => p.portions === portions)?.is_offered ?? false;
}
