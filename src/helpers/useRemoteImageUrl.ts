export const useRemoteImageUrl = (url: string): string => {
  const baseUrl = 'https://images.gousto.wiki/';

  // Ensure url is valid and starts with '/images/'
  if (!url || !url.startsWith('/images/')) {
    return url;
  }

  return `${baseUrl}${url.replace(/^\/images\//, '')}`;
};
