export const createImageUrl = (
  imagePath: string,
  params: Record<string, string | number> = {}
): string => {
  const { baseUrl, imagePath: imagePrefix, defaultParams } = IMAGE_CONFIG;

  if (!imagePath || !imagePath.startsWith(imagePrefix)) {
    return imagePath;
  }

  const relativePath = imagePath.slice(imagePrefix.length);

  let url = `${baseUrl}${encodeURIComponent(relativePath)}`;

  const allParams = new URLSearchParams(defaultParams);

  for (const [key, value] of Object.entries(params)) {
    allParams.set(key, String(value));
  }

  url += `&${allParams.toString()}`;

  return url;
};
