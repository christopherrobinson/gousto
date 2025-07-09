describe('isValidNumber', () => {
  it('should return true for a valid number', () => {
    expect(isValidNumber(123)).toBe(true);
    expect(isValidNumber(0)).toBe(true);
    expect(isValidNumber(-123)).toBe(true);
    expect(isValidNumber(123.45)).toBe(true);
  });

  it('should return false for NaN', () => {
    expect(isValidNumber(NaN)).toBe(false);
  });

  it('should return false for Infinity', () => {
    expect(isValidNumber(Infinity)).toBe(false);
    expect(isValidNumber(-Infinity)).toBe(false);
  });

  it('should return false for non-number values', () => {
    expect(isValidNumber(null)).toBe(false);
    expect(isValidNumber(undefined)).toBe(false);
    expect(isValidNumber('123')).toBe(false);
    expect(isValidNumber(true)).toBe(false);
    expect(isValidNumber([])).toBe(false);
    expect(isValidNumber({})).toBe(false);
  });
});
