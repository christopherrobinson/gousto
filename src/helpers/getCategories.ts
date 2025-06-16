const cuisines = await getCuisines();
const excludedCategories = new Set(['12', 'All Gousto', 'All', 'Test']);

// Add each cuisine name to the exclusion set
for (const { name } of cuisines) {
  excludedCategories.add(name);
}


export const getCategories = async () => {
  const cacheKey = 'all-categories';

  // Check cache first
  const cached = categoryCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const recipes = await getRecipes(); // Fetch recipes

  const categoryMap = new Map<string, { name: string; combinedCategories: Set<string> }>();

  for (const { data } of recipes) {
    const recipeCategories = data.categories;

    if (!isNonEmptyArray(recipeCategories)) {
      continue;
    }

    for (const category of recipeCategories) {
      if (!isNonEmptyString(category)) {
        continue;
      }

      const normalisedCategory = normaliseCategoryName(category);

      // Skip excluded categories early
      if (excludedCategories.has(normalisedCategory)) {
        continue;
      }

      // Use utility function for cleaner Map updates
      updateMapEntry(categoryMap, normalisedCategory, (existing) => {
        if (existing) {
          existing.combinedCategories.add(category);

          return existing;
        }
        else {
          return {
            name: normalisedCategory,
            combinedCategories: new Set([category])
          };
        }
      });
    }
  }

  // Convert the Set to an array and prepare the final category list
  const result = sortByStringProperty(
    Array.from(categoryMap.values()),
    'name'
  ).map(({ name, combinedCategories }) => ({
    name,
    slug: `/recipes/category/${createSlug(name)}/`, // Create the slug
    combinedCategories: Array.from(combinedCategories) // Convert Set to array
  }));

  // Store in cache
  categoryCache.set(cacheKey, result);

  return result;
};
