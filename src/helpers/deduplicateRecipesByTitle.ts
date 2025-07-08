export const deduplicateRecipesByTitle = (
  recipes: any[],
  removeXL: boolean = false
): any[] => {
  const premiumRegex = /^\[(prem|premium) (pro|prot|prot\.|protein|proteins)\]\s*/i;
  const grouped = new Map<string, { normal?: any; premium?: any }>();

  // Pre-compile suffix patterns for better performance
  const suffixPatterns = ignoredRecipeSuffixes.map(suffix => ({
    suffix: `-${createSlug(suffix)}`,
    length: createSlug(suffix).length + 1
  }));

  for (const recipe of recipes) {
    const title = recipe.data.title?.trim();

    // Early exit for invalid titles
    if (!title) {
      continue;
    }

    const isPremium = premiumRegex.test(title);
    const strippedTitle = isPremium ? title.replace(premiumRegex, '').trim() : title;

    // Early exit for XL recipes if filtering is enabled
    if (removeXL && /\bXL\b/.test(strippedTitle)) {
      continue;
    }

    let slug = createSlug(strippedTitle);

    // Optimised suffix removal - break on first match
    for (const { suffix, length } of suffixPatterns) {
      if (slug.endsWith(suffix)) {
        slug = slug.slice(0, -length);

        break;
      }
    }

    // Use Map.set with default value pattern for cleaner code
    if (!grouped.has(slug)) {
      grouped.set(slug, {});
    }

    const entry = grouped.get(slug)!;

    if (isPremium) {
      entry.premium = { recipe, strippedTitle };
    }
    else {
      entry.normal = { recipe, strippedTitle };
    }
  }

  // Pre-allocate array with estimated size for better performance
  const deduplicated: any[] = [];
  deduplicated.length = grouped.size; // Pre-allocate
  let index = 0;

  for (const { normal, premium } of grouped.values()) {
    if (normal) {
      deduplicated[index++] = normal.recipe;
    }
    else if (premium) {
      // Update premium recipe to look like a non-premium one
      premium.recipe.data.title = premium.strippedTitle;
      premium.recipe.id = createSlug(premium.strippedTitle);
      deduplicated[index++] = premium.recipe;
    }
  }

  // Trim array to actual size (in case some entries were skipped)
  deduplicated.length = index;

  return deduplicated;
};
