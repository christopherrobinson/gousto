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

  it('should call createImageUrl with the provided params', () => {
    const url = 'https://localhost/image.jpg';
    const params = { fit: 'crop', h: 200, w: 100 };

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, params);
  });

  it('should handle empty params object', () => {
    const url = 'https://localhost/image.jpg';
    const params = {};

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, {});
  });

  it('should handle params with no value', () => {
    const url = 'https://localhost/image.jpg';
    const params = { h: undefined, w: 100 };

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, params);
  });

  it('should handle params with special characters', () => {
    const url = 'https://localhost/image.jpg';
    const params = { color: '%23FF0000', text: 'helloo%20world' };

    useRemoteImageUrl(url, params);
    expect(createImageUrl).toHaveBeenCalledWith(url, params);
  });
});


