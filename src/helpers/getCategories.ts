let categoryCache: { name: string; slug: string; combinedCategories: string[] }[] | null = null;

const excludedCategories = new Set(['All Gousto Recipes', 'All Recipes']); // List of categories to exclude

// Helper function to strip " recipes" and similar suffixes (case-insensitive)
const stripCategoryName = (name: string): string => {
  const stripped = name.trim().replace(/ recipes$/i, '').trim();
  return stripped;
};

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

  recipes.forEach(({ data }) => {
    const recipeCategories = data.categories;

    if (Array.isArray(recipeCategories)) {
      recipeCategories.forEach(category => {
        if (typeof category === 'string' && !excludedCategories.has(category)) {
          const normalisedCategory = normaliseCategoryName(category);

          // If the normalised category doesn't exist in the map, create it
          if (!categoryMap.has(normalisedCategory)) {
            categoryMap.set(normalisedCategory, {
              name: normalisedCategory,
              combinedCategories: new Set([category]) // Start with the original category
            });
          } else {
            // If the normalised category already exists, add the original category to the combined list
            const existingCategory = categoryMap.get(normalisedCategory);
            existingCategory?.combinedCategories.add(category); // Use Set to avoid duplicates
          }
        }
      });
    }
  });

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
