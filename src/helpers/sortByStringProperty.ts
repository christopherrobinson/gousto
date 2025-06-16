/**
 * Sorts an array of objects by a string property using localeCompare
 */
export const sortByStringProperty = <T>(
  array: T[],
  propertyPath: string | ((item: T) => string)
): T[] => {
  const getValue = typeof propertyPath === 'function'
    ? propertyPath
    : (item: T) => (item as any)[propertyPath];

  return array.sort((a, b) => {
    const valueA = getValue(a);
    const valueB = getValue(b);

    return valueA.localeCompare(valueB);
  });
};
