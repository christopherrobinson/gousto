export const formatMilligramsToGrams = (
  milligrams: number,
  options: FormatMilligramsToGramsOptions = {}
): string => {
  const {
    locale = 'en-GB',
    minimumFractionDigits = 0,
    maximumFractionDigits = 1
  } = options;

  const grams = milligrams / 1000;

  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits
  });

  return formatter.format(grams);
}

interface FormatMilligramsToGramsOptions {
  locale?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}
