export const extractIngredientKeywords = (ingredients: { label?: string | null }[] = []): string[] => {
  const commonUnits = [
    "bunch", "bunches", "clove", "cloves", "g", "kg", "ml", "packet", "packets",
    "piece", "pieces", "pinch", "sachet", "sachets", "slice", "slices", "steak",
    "steaks", "tbsp", "tsp"
  ];

  return ingredients.flatMap(({ label }) => {
    if (!label || typeof label !== 'string') {
      return [];
    }

    return label
      .toLowerCase()
      .replace(/[^a-z\s]/g, '')
      .replace(/\b\d+\b/g, '')
      .split(/\s+/)
      .filter(w => w && !commonUnits.includes(w));
  });
};
