describe('sanitisedIngredient', () => {
  it('should remove leading single quotes', () => {
    expect(sanitisedIngredient("'Test Ingredient")).toBe('test ingredient');
  });

  it('should convert to lowercase', () => {
    expect(sanitisedIngredient('Test Ingredient')).toBe('test ingredient');
  });

  it('should remove anything in brackets', () => {
    expect(sanitisedIngredient('Ingredient (100g)')).toBe('ingredient');
  });

  it('should remove unit expressions', () => {
    expect(sanitisedIngredient('Ingredient 100g')).toBe('ingredient');
    expect(sanitisedIngredient('Ingredient 2ml')).toBe('ingredient');
    expect(sanitisedIngredient('Ingredient 1tbsp')).toBe('ingredient');
  });

  it('should remove quantity like "x2"', () => {
    expect(sanitisedIngredient('Ingredient x2')).toBe('ingredient');
  });

  it('should remove extra piece markers', () => {
    expect(sanitisedIngredient('Ingredient pcs')).toBe('ingredient');
    expect(sanitisedIngredient('Ingredient x4')).toBe('ingredient');
  });

  it('should remove numbers unless exactly 4 digits', () => {
    expect(sanitisedIngredient('Ingredient 123')).toBe('ingredient');
    expect(sanitisedIngredient('Ingredient 1234')).toBe('ingredient 1234');
  });

  it('should preserve letters, digits, spaces, &, \', comma, and hyphen', () => {
    expect(sanitisedIngredient('Ingredient-Test &\'s, 1234')).toBe('ingredient-test &\'s, 1234');
  });

  it('should collapse extra whitespace', () => {
    expect(sanitisedIngredient('Ingredient   Test')).toBe('ingredient test');
  });

  it('should remove leading/trailing whitespace', () => {
    expect(sanitisedIngredient('  Ingredient Test  ')).toBe('ingredient test');
  });

  it('should remove trailing hyphens', () => {
    expect(sanitisedIngredient('Ingredient Test -')).toBe('ingredient test');
  });

  it('should handle empty string', () => {
    expect(sanitisedIngredient('')).toBe('');
  });

  it('should handle null or undefined input', () => {
    expect(sanitisedIngredient(null)).toBe('');
    expect(sanitisedIngredient(undefined)).toBe('');
  });
});
