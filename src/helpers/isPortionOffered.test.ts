const portionSizes = [
  { portions: 2, is_offered: true },
  { portions: 4, is_offered: false },
];

describe('isPortionOffered', () => {
  it('should return true if the portion is offered', () => {
    expect(isPortionOffered(portionSizes, 2)).toBe(true);
  });

  it('should return false if the portion is not offered', () => {
    expect(isPortionOffered(portionSizes, 4)).toBe(false);
  });

  it('should return false if the portion is not found', () => {
    expect(isPortionOffered(portionSizes, 6)).toBe(false);
  });

  it('should return false if portionSizes is null or undefined', () => {
    expect(isPortionOffered(null, 2)).toBe(false);
    expect(isPortionOffered(undefined, 2)).toBe(false);
  });

  it('should return false if portionSizes is an empty array', () => {
    expect(isPortionOffered([], 2)).toBe(false);
  });
});
