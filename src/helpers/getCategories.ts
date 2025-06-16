let categoryCache: { name: string; slug: string; combinedCategories: string[] }[] | null = null;

const cuisines = await getCuisines();
const excludedCategories = new Set(['12', 'All Gousto', 'All', 'Test']);

// Add each cuisine name to the exclusion set
for (const { name } of cuisines) {
  excludedCategories.add(name);
}

// Helper function to strip " recipes" and similar suffixes (case-insensitive)
const stripCategoryName = (name: string): string => name.trim().replace(/ recipes$/i, '').trim();

// Special cases
const normaliseCategoryName = (category: string): string => {
  const trimmedCategory = stripCategoryName(category.trim());

  if (trimmedCategory === "Chicken" || trimmedCategory === "Chicken Breast" || trimmedCategory === "Chicken Thigh") {
    return "Chicken";
  }

  if (trimmedCategory === "Christmas" || trimmedCategory === "Christmas Inspired") {
    return "Christmas";
  }

  if (trimmedCategory === "Dairy-Free" || trimmedCategory === "Dairy Free") {
    return "Dairy-Free";
  }

  if (trimmedCategory === "Easter" || trimmedCategory === "Easter 2") {
    return "Easter";
  }

  if (trimmedCategory === "Father's Day" || trimmedCategory === "Father's Day 2") {
    return "Father's Day";
  }

  if (trimmedCategory === "Festive Flavours" || trimmedCategory === "Festive Flavours 2019") {
    return "Festive Flavours";
  }

  if (trimmedCategory === "Gluten-Free" || trimmedCategory === "Gluten Free") {
    return "Gluten-Free";
  }

  if (trimmedCategory === "Plant-Based" || trimmedCategory === "Plant Bistro") {
    return "Plant-Based";
  }

  if (trimmedCategory === "Pork" || trimmedCategory === "Pork Fillet") {
    return "Pork";
  }

  return stripCategoryName(trimmedCategory);
};

export const getCategories = async () => {
  // If categories are already cached, return them
  if (categoryCache) {
    return categoryCache;
  }

  const recipes = await getRecipes(); // Fetch recipes

  const categoryMap = new Map<string, { name: string; combinedCategories: Set<string> }>();

  for (const { data } of recipes) {
    const recipeCategories = data.categories;

    if (!Array.isArray(recipeCategories)) {
      continue;
    }

    for (const category of recipeCategories) {
      if (typeof category !== 'string') {
        continue;
      }

      const normalisedCategory = normaliseCategoryName(category);

      // Skip excluded categories early
      if (excludedCategories.has(normalisedCategory)) {
        continue;
      }

      // Use Map's built-in get/set pattern for better performance
      const existing = categoryMap.get(normalisedCategory);
      if (existing) {
        existing.combinedCategories.add(category);
      }
      else {
        categoryMap.set(normalisedCategory, {
          name: normalisedCategory,
          combinedCategories: new Set([category])
        });
      }
    }
  }

  // Convert the Set to an array and prepare the final category list
  categoryCache = Array.from(categoryMap.values())
    .sort((a, b) => a.name.localeCompare(b.name)) // Sort the stripped category names alphabetically
    .map(({ name, combinedCategories }) => ({
      name,
      slug: `/recipes/category/${createSlug(name)}/`, // Create the slug
      combinedCategories: Array.from(combinedCategories) // Convert Set to array
    }));

  return categoryCache;
};
