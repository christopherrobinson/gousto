export const sanitisedIngredient = (label: string): string => {
  if (typeof label !== 'string') {
    return '';
  }

  return label
    .replace(/^'+/, '')                                                            // remove leading single quotes
    .toLowerCase()                                                                 // convert to lowercase
    .replace(/\([^)]*\)/g, '')                                                     // remove anything in brackets (amounts/weights)
    .replace(/\b\d+(\.\d+)?\s?(g|ml|tbsp|tsp|pcs|pkt|x|x\d+|cm|kg|l|oz)\b/gi, '')  // remove unit expressions
    .replace(/\b\d+\s?x\b/gi, '')                                                  // remove quantity like "x2"
    .replace(/\b(?:pcs?|x\d+)\b/gi, '')                                            // extra piece markers
    .replace(/\b(?!\d{4}\b)\d+(\.\d+)?\b/g, '')                                    // remove numbers unless exactly 4 digits
    .replace(/[^\p{L}\s&',0-9-]/gu, '')                                            // preserve letters, digits, spaces, &, ', comma, and hyphen
    .replace(/\s{2,}/g, ' ')                                                       // collapse extra whitespace
    .trim()                                                                        // remove leading/trailing whitespace
    .replace(/\s+-\s*$/, '');                                                      // remove trailing hyphens
};
