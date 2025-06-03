export const deduplicateRecipesByTitle = (
  recipes: any[],
  removeXL: boolean = false
): any[] => {
  const seenSlugs = new Set<string>();
  const deduplicated: any[] = [];

  for (const recipe of recipes.sort((a, b) => a.data.title.localeCompare(b.data.title))) {
    const rawTitle = recipe.data.title;

    if (removeXL && /\bXL\b/.test(rawTitle)) {
      continue;
    }

    const slug = createSlug(rawTitle);

    // Check for suffix presence
    const hasSuffix = ignoredRecipeSuffixes.some(suffix => slug.endsWith(`-${createSlug(suffix)}`));

    // Strip suffix if present to get base slug
    let baseSlug = slug;

    for (const suffix of ignoredRecipeSuffixes) {
      const slugSuffix = `-${createSlug(suffix)}`;

      if (baseSlug.endsWith(slugSuffix)) {
        baseSlug = baseSlug.slice(0, -slugSuffix.length);

        break;
      }
    }

    if (hasSuffix && seenSlugs.has(baseSlug)) {
      continue;
    }

    seenSlugs.add(baseSlug);
    deduplicated.push(recipe);
  }

  return deduplicated;
};
