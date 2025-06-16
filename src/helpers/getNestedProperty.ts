/**
 * Gets a nested property value from an object using dot notation
 */
export const getNestedProperty = (obj: any, path: string): any => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};
