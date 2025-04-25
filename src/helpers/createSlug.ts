export const createSlug = (input: string | undefined | null): string => {
  if (!input?.trim()) {
    return '';
  }

  return input
    .replace(/[’‘]/g, "'")            // replace curly apostrophes
    .replace(/[“”]/g, '"')            // replace curly quotes
    .replace(/\s+/g, ' ')             // collapse multiple spaces
    .trim()                           // trim whitespace
    .normalize('NFD')                 // split accents from letters (e.g. é → e + ́)
    .replace(/[\u0300-\u036f]/g, '')  // remove accent characters (diacritics)
    .replace(/&/g, 'and')             // convert & to 'and'
    .toLowerCase()                    // convert to lowercase
    .replace(/(\w)['’]s\b/g, '$1s')   // replace curly or straight apostrophe-s (e.g. "cheat's") with just "s"
    .replace(/[^a-z0-9]+/g, '-')      // replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, '');         // remove leading/trailing hyphens
};
