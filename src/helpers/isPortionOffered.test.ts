const portionSizes = {
  '2': { is_offered: true },
  '4': { is_offered: false },
};

describe('isPortionOffered', () => {
  it('should return true if the portion is offered', () => {
    // The function should correctly find the key '2' and return its 'is_offered' value.
    expect(isPortionOffered(portionSizes, 2)).toBe(true);
  });

  it('should return false if the portion is not offered', () => {
    // The function should correctly find the key '4' and return its 'is_offered' value.
    expect(isPortionOffered(portionSizes, 4)).toBe(false);
  });

  it('should return false if the portion is not found', () => {
    // The function should not find the key '6' and return false.
    expect(isPortionOffered(portionSizes, 6)).toBe(false);
  });

  it('should return false if portionSizes is null or undefined', () => {
    // This test remains valid as it checks for null/undefined input.
    expect(isPortionOffered(null, 2)).toBe(false);
    expect(isPortionOffered(undefined, 2)).toBe(false);
  });

  it('should return false if portionSizes is an empty object', () => {
    // Updated to check for an empty object instead of an empty array.
    expect(isPortionOffered({}, 2)).toBe(false);
  });
});
