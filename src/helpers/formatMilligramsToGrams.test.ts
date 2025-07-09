describe('formatMilligramsToGrams', () => {
  it('should format milligrams to grams correctly', () => {
    expect(formatMilligramsToGrams(1500)).toBe('1.5');
  });

  it('should handle zero milligrams', () => {
    expect(formatMilligramsToGrams(0)).toBe('0');
  });

  it('should handle different locales', () => {
    expect(formatMilligramsToGrams(2000, { locale: 'en-GB' })).toBe('2');
  });

  it('should handle fraction digits', () => {
    expect(formatMilligramsToGrams(1234, { minimumFractionDigits: 2, maximumFractionDigits: 2 })).toBe('1.23');
  });

  it("should return '0' for invalid input", () => {
    expect(formatMilligramsToGrams(NaN)).toBe('0');
    expect(formatMilligramsToGrams(null)).toBe('0');
    expect(formatMilligramsToGrams(undefined)).toBe('0');
  });
});
