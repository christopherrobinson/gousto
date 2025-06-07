export const useRemoteImageUrl = (url: string, params: string): string => {
  const baseUrl = 'https://wsrv.nl/?url=images.gousto.wiki/';

  // Ensure url is valid and starts with '/images/'
  if (!url || !url.startsWith('/images/')) {
    return url;
  }

  url = `${baseUrl}${url.replace(/^\/images\//, '')}`;
  url = `${url}&fit=cover`;

  if (params) {
    url = `${url}&${params}`;
  }

  return url;
};
