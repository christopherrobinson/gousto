import { useRemoteImageUrl } from './useRemoteImageUrl.ts';

vi.mock('./createImageUrl', () => {
  const mockCreateImageUrl = vi.fn((url, params) => {
    const queryString = Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return `${url}?${queryString}`;
  });

  return { createImageUrl: mockCreateImageUrl };
});

describe('useRemoteImageUrl', () => {
  beforeEach(() => {
    (createImageUrl as ReturnType<typeof vi.fn>).mockClear();
  });

  it('should call createImageUrl with parsed params', () => {
    const url = 'https://localhost/image.jpg';
    const params = 'w=100&h=200&fit=crop';

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, { w: '100', h: '200', fit: 'crop' });
  });

  it('should handle empty params string', () => {
    const url = 'https://localhost/image.jpg';
    const params = '';

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, {});
  });

  it('should handle params with no value', () => {
    const url = 'https://localhost/image.jpg';
    const params = 'w=100&h=';

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, { w: '100' });
  });

  it('should handle params with special characters', () => {
    const url = 'https://localhost/image.jpg';
    const params = 'text=hello%20world&color=%23FF0000';

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, { text: 'hello%20world', color: '%23FF0000' });
  });
});


