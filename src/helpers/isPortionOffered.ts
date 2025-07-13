import { type IngredientsProps } from '../types/Ingredients.ts';

export const isPortionOffered = (portionSizes: IngredientsProps['portion_sizes'], portions: number): boolean => {
  if (!portionSizes) {
    return false;
  }

  // Access the portion data directly using the 'portions' number as the key.
  const portionInfo = portionSizes[portions];

  return portionInfo?.is_offered ?? false;
}
