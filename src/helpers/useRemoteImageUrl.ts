export const useRemoteImageUrl = (url: string, params: Record<string, string | number> = {}): string => {
  return createImageUrl(url, params);
};
