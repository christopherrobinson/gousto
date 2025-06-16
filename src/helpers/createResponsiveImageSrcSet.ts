/**
 * Creates responsive image srcset
 */
export const createResponsiveImageSrcSet = (
  imagePath: string,
  sizes: Array<{ width: number; height: number; density?: number }>
): string => {
  return sizes
    .map(({ width, height, density = 1 }) => {
      const url = createImageUrl(imagePath, { w: width, h: height });

      return density > 1 ? `${url} ${density}x` : url;
    })
    .join(', ');
};
