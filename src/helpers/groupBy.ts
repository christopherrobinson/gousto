/**
 * Groups array items by a key function
 */
export const groupBy = <T, K extends string | number>(
  array: T[],
  keyFn: (item: T) => K
): Map<K, T[]> => {
  const groups = new Map<K, T[]>();

  for (const item of array) {
    const key = keyFn(item);
    const existing = groups.get(key);

    if (existing) {
      existing.push(item);
    }
    else {
      groups.set(key, [item]);
    }
  }

  return groups;
};
