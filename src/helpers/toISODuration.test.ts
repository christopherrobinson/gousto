describe('toISODuration', () => {
  it('should convert hours to ISO 8601 duration', () => {
    expect(toISODuration('2 hours')).toBe('PT2H');
  });

  it('should convert minutes to ISO 8601 duration', () => {
    expect(toISODuration('30 minutes')).toBe('PT30M');
  });

  it('should convert seconds to ISO 8601 duration', () => {
    expect(toISODuration('45 seconds')).toBe('PT45S');
  });

  it('should convert mixed units to ISO 8601 duration', () => {
    expect(toISODuration('1 hour 30 minutes')).toBe('PT1H30M');
    expect(toISODuration('2 hours 15 minutes 10 seconds')).toBe('PT2H15M10S');
  });

  it('should handle plural and singular units', () => {
    expect(toISODuration('1 hour')).toBe('PT1H');
    expect(toISODuration('1 minute')).toBe('PT1M');
    expect(toISODuration('1 second')).toBe('PT1S');
  });

  it('should return null for empty input', () => {
    expect(toISODuration('')).toBeNull();
  });

  it('should return null for input with no valid units', () => {
    expect(toISODuration('some text')).toBeNull();
  });

  it('should return null for zero duration', () => {
    expect(toISODuration('0 hours 0 minutes 0 seconds')).toBeNull();
  });

  it('should handle multiple occurrences of the same unit', () => {
    expect(toISODuration('1 hour 30 minutes 1 hour')).toBe('PT2H30M');
  });

  it('should handle different casing for units', () => {
    expect(toISODuration('1 HoUr 30 MiNuTeS')).toBe('PT1H30M');
  });
});
