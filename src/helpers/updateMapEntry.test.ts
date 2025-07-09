describe('updateMapEntry', () => {
  it('should update an existing entry in the map', () => {
    const myMap = new Map<string, number>([['a', 1], ['b', 2]]);

    updateMapEntry(myMap, 'a', (existing = 0) => existing + 1);
    expect(myMap.get('a')).toBe(2);
  });

  it('should add a new entry if the key does not exist', () => {
    const myMap = new Map<string, number>([['a', 1]]);

    updateMapEntry(myMap, 'c', (existing = 0) => existing + 1);
    expect(myMap.get('c')).toBe(1);
  });

  it('should handle undefined existing value correctly', () => {
    const myMap = new Map<string, string>();

    updateMapEntry(myMap, 'newKey', (existing) => (existing ? existing + '!' : 'initial'));
    expect(myMap.get('newKey')).toBe('initial');
  });

  it('should allow complex updates based on existing value', () => {
    const myMap = new Map<string, number[]>([['data', [1, 2]]]);

    updateMapEntry(myMap, 'data', (existing = []) => [...existing, 3]);
    expect(myMap.get('data')).toEqual([1, 2, 3]);
  });

  it('should work with different types of keys and values', () => {
    const myMap = new Map<number, string>([[1, 'one']]);

    updateMapEntry(myMap, 2, () => 'two');
    expect(myMap.get(2)).toBe('two');
  });
});
