export const isValidRating = (rating: { average: number | null | undefined; count: number | null | undefined } | null | undefined): boolean => {
  return rating != null && rating.average != null && rating.count != null;
}
