/**
 * Generates optimised image URL with parameters
 */
export const createImageUrl = (
  imagePath: string,
  params: Record<string, string | number> = {}
): string => {
  // Validate and clean image path
  if (!imagePath || !imagePath.startsWith(IMAGE_CONFIG.imagePath)) {
    return imagePath;
  }

  // Remove the /images/ prefix
  const cleanPath = imagePath.replace(/^\/images\//, '');

  // Build URL with base and default params
  let url = `${IMAGE_CONFIG.baseUrl}${cleanPath}&${IMAGE_CONFIG.defaultParams}`;

  // Add additional parameters
  for (const [key, value] of Object.entries(params)) {
    url += `&${key}=${value}`;
  }

  return url;
};
