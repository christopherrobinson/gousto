describe('normaliseText', () => {
  it('should convert to lowercase', () => {
    expect(normaliseText('HELLO WORLD')).toBe('hello world');
  });

  it('should trim whitespace and convert to lowercase', () => {
    expect(normaliseText('  Hello World  ')).toBe('hello world');
  });

  it('should handle empty string', () => {
    expect(normaliseText('')).toBe('');
  });

  it('should handle string with only whitespace', () => {
    expect(normaliseText('   ')).toBe('');
  });

  it('should handle string with numbers and symbols', () => {
    expect(normaliseText('123!@#ABC')).toBe('123!@#abc');
  });
});
