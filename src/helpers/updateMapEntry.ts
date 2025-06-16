export const updateMapEntry = <K, V>(
  map: Map<K, V>,
  key: K,
  updateFn: (existing: V | undefined) => V
): void => {
  const existing = map.get(key);

  map.set(key, updateFn(existing));
};
