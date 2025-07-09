describe('nullIfEmpty', () => {
  it('should return null for an empty string', () => {
    expect(nullIfEmpty('')).toBeNull();
  });

  it('should return null for a string with only whitespace', () => {
    expect(nullIfEmpty('   ')).toBeNull();
  });

  it('should return null for undefined', () => {
    expect(nullIfEmpty(undefined)).toBeNull();
  });

  it('should return null for null', () => {
    expect(nullIfEmpty(null)).toBeNull();
  });

  it('should return the string for a non-empty string', () => {
    expect(nullIfEmpty('hello')).toBe('hello');
  });

  it('should return the string for a non-empty string with leading/trailing whitespace', () => {
    expect(nullIfEmpty('  hello  ')).toBe('  hello  ');
  });
});
