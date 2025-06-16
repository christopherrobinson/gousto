/**
 * Strips common recipe suffixes from category names
 */
export const stripRecipeSuffix = (name: string): string => {
  return name.trim().replace(/ recipes$/i, '').trim();
};