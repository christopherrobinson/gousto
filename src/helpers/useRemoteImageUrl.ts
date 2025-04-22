export const useRemoteImageUrl = (url: string) => {
  const baseUrl = 'https://images.gousto.wiki/';

  return `${baseUrl}${url.replace(/^\/images\//, '')}`;
}
