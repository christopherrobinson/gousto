export const useRemoteImageUrl = (url: string, params: string): string => {
  const paramObj: Record<string, string> = {};

  if (params) {
    params.split('&').forEach(param => {
      const [key, value] = param.split('=');

      if (key && value) {
        paramObj[key] = value;
      }
    });
  }

  return createImageUrl(url, paramObj);
};
