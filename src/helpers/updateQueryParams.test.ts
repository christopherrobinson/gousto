describe('updateQueryParams', () => {
  it('should add new query parameters', () => {
    const url = new URL('https://localhost/path');
    const updates = [{ param1: 'value1' }];

    expect(updateQueryParams(url, updates)).toBe('/path?param1=value1');
  });

  it('should update existing query parameters', () => {
    const url = new URL('https://localhost/path?param1=oldValue');
    const updates = [{ param1: 'newValue' }];

    expect(updateQueryParams(url, updates)).toBe('/path?param1=newValue');
  });

  it('should delete query parameters when value is false', () => {
    const url = new URL('https://localhost/path?param1=value1&param2=value2');
    const updates = [{ param1: false }];

    expect(updateQueryParams(url, updates)).toBe('/path?param2=value2');
  });

  it('should handle multiple updates', () => {
    const url = new URL('https://localhost/path?param1=value1');
    const updates = [{ param2: 'value2' }, { param1: 'newValue1' }];

    expect(updateQueryParams(url, updates)).toBe('/path?param1=newValue1&param2=value2');
  });

  it('should sort query parameters alphabetically', () => {
    const url = new URL('https://localhost/path?paramB=valueB&paramA=valueA');
    const updates = [];

    expect(updateQueryParams(url, updates)).toBe('/path?paramA=valueA&paramB=valueB');
  });

  it('should return only pathname if no query parameters remain', () => {
    const url = new URL('https://localhost/path?param1=value1');
    const updates = [{ param1: false }];

    expect(updateQueryParams(url, updates)).toBe('/path');
  });

  it('should handle empty updates array', () => {
    const url = new URL('https://localhost/path?param1=value1');
    const updates = [];

    expect(updateQueryParams(url, updates)).toBe('/path?param1=value1');
  });

  it('should handle empty URL search params initially', () => {
    const url = new URL('https://localhost/path');
    const updates = [{ param1: 'value1' }];

    expect(updateQueryParams(url, updates)).toBe('/path?param1=value1');
  });

  it('should handle mixed add, update, and delete operations', () => {
    const url = new URL('https://localhost/path?a=1&b=2&c=3');
    const updates = [{ b: false }, { d: '4' }, { a: 'newA' }];

    expect(updateQueryParams(url, updates)).toBe('/path?a=newA&c=3&d=4');
  });
});
