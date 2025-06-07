export const deduplicateRecipesByTitle = (
  recipes: any[],
  removeXL: boolean = false
): any[] => {
  const premiumRegex = /^\[premium (pro|prot|prot\.|protein|proteins)\]\s*/i;
  const grouped = new Map<string, { normal?: any; premium?: any }>();

  for (const recipe of recipes) {
    let title = recipe.data.title?.trim();

    if (!title) {
      continue;
    }

    const isPremium = premiumRegex.test(title);
    const strippedTitle = isPremium ? title.replace(premiumRegex, '').trim() : title;

    if (removeXL && /\bXL\b/.test(strippedTitle)) {
      continue;
    }

    let slug = createSlug(strippedTitle);

    // Strip known suffixes
    for (const suffix of ignoredRecipeSuffixes) {
      const slugSuffix = `-${createSlug(suffix)}`;

      if (slug.endsWith(slugSuffix)) {
        slug = slug.slice(0, -slugSuffix.length);

        break;
      }
    }

    // Group recipes by base slug
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

  const deduplicated: any[] = [];

  for (const { normal, premium } of grouped.values()) {
    if (normal) {
      deduplicated.push(normal.recipe);
    }
    else if (premium) {
      // Update premium recipe to look like a non-premium one
      premium.recipe.data.title = premium.strippedTitle;
      premium.recipe.id = createSlug(premium.strippedTitle);

      deduplicated.push(premium.recipe);
    }
  }

  return deduplicated;
};
