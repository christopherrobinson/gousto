export const formatMilligramsToGrams = (
  milligrams: number,
  {
    locale = 'en-GB',
    minimumFractionDigits = 0,
    maximumFractionDigits = 1
  }: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string => {
  if (typeof milligrams !== 'number' || isNaN(milligrams)) {
    return '0';
  }

  const grams = milligrams / 1000;

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits
  });

  return formatter.format(grams);
}
