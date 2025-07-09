describe('isNonEmptyArray', () => {
  it('should return true for a non-empty array', () => {
    expect(isNonEmptyArray([1, 2, 3])).toBe(true);
  });

  it('should return false for an empty array', () => {
    expect(isNonEmptyArray([])).toBe(false);
  });

  it('should return false for a non-array value', () => {
    expect(isNonEmptyArray(null)).toBe(false);
    expect(isNonEmptyArray(undefined)).toBe(false);
    expect(isNonEmptyArray('string')).toBe(false);
    expect(isNonEmptyArray(123)).toBe(false);
    expect(isNonEmptyArray({})).toBe(false);
  });
});
