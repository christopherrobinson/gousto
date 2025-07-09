describe('isValidRating', () => {
  it('should return true for a valid rating object', () => {
    expect(isValidRating({ average: 4.5, count: 10 })).toBe(true);
  });

  it('should return false if rating is null', () => {
    expect(isValidRating(null)).toBe(false);
  });

  it('should return false if rating is undefined', () => {
    expect(isValidRating(undefined)).toBe(false);
  });

  it('should return false if average is null', () => {
    expect(isValidRating({ average: null, count: 10 })).toBe(false);
  });

  it('should return false if average is undefined', () => {
    expect(isValidRating({ average: undefined, count: 10 })).toBe(false);
  });

  it('should return false if count is null', () => {
    expect(isValidRating({ average: 4.5, count: null })).toBe(false);
  });

  it('should return false if count is undefined', () => {
    expect(isValidRating({ average: 4.5, count: undefined })).toBe(false);
  });

  it('should return false if both average and count are null', () => {
    expect(isValidRating({ average: null, count: null })).toBe(false);
  });

  it('should return false if both average and count are undefined', () => {
    expect(isValidRating({ average: undefined, count: undefined })).toBe(false);
  });
});
