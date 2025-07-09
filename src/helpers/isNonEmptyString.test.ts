describe('isNonEmptyString', () => {
  it('should return true for a non-empty string', () => {
    expect(isNonEmptyString('hello')).toBe(true);
  });

  it('should return false for an empty string', () => {
    expect(isNonEmptyString('')).toBe(false);
  });

  it('should return false for a string with only whitespace', () => {
    expect(isNonEmptyString('   ')).toBe(false);
  });

  it('should return false for a non-string value', () => {
    expect(isNonEmptyString(null)).toBe(false);
    expect(isNonEmptyString(undefined)).toBe(false);
    expect(isNonEmptyString(123)).toBe(false);
    expect(isNonEmptyString([])).toBe(false);
    expect(isNonEmptyString({})).toBe(false);
  });
});
