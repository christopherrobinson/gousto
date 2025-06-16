/**
 * Converts Map to sorted array using a comparison function
 */
export const mapToSortedArray = <K, V>(
  map: Map<K, V>,
  compareFn: (a: V, b: V) => number
): V[] => {
  return Array.from(map.values()).sort(compareFn);
};