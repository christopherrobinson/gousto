export const deduplicateRecipes = (
  recipes: any[],
  removeXL: boolean = false
): any[] => {
  const premiumRegex = /^\[(prem|premium)\s+(pro|prot|prot\.|protein|proteins)\]\s*/i;
  const bracketPrefixRegex = /^\([^)]+\)\s*/;

  type Entry = {
    recipe: any;
    strippedTitle: string;
    hadSuffix: boolean;
    hadBracketPrefix: boolean;
    descKey?: string;
    nutKey?: string;
  };

  const grouped = new Map<
    string,
    {
      base?: Entry;
      bracketed?: Entry;
    }
  >();

  // description+nutrition → canonical group slug
  const descNutToGroupSlug = new Map<string, string>();

  const suffixPatterns = ignoredRecipeSuffixes.map(suffix => {
    const sluggedSuffix = `-${createSlug(suffix)}`;
    return { length: sluggedSuffix.length, slug: sluggedSuffix };
  });

  const getNutrientSignature = (recipe: any): string | undefined => {
    const info =
      recipe?.data?.nutritional_information?.per_hundred_grams ??
      recipe?.nutritional_information?.per_hundred_grams;
    if (!info || typeof info !== 'object') return undefined;

    // Build a stable, ordered snapshot of numeric fields only.
    const ordered: Record<string, number> = {};
    for (const key of Object.keys(info).sort()) {
      const val = (info as any)[key];
      if (typeof val === 'number' && isFinite(val)) {
        // Round to 1 decimal to smooth tiny scrape variances; tweak if needed.
        ordered[key] = Math.round(val * 10) / 10;
      }
    }
    if (!Object.keys(ordered).length) return undefined;

    return JSON.stringify(ordered);
  };

  const score = (e: Entry) => {
    // Prefer entries without ignored suffix and without bracket-prefix.
    let s = 0;
    if (!e.hadSuffix) s += 1;
    if (!e.hadBracketPrefix) s += 1;
    return s;
  };

  for (const recipe of recipes) {
    const rawTitle: string | undefined = recipe?.data?.title ?? recipe?.title;
    const title = rawTitle?.trim();
    if (!title) continue;

    const premiumStripped = title.replace(premiumRegex, '').trim();
    if (removeXL && /\bXL\b/i.test(premiumStripped)) continue;

    const hadBracketPrefix = bracketPrefixRegex.test(premiumStripped);
    const cleanTitle = premiumStripped.replace(bracketPrefixRegex, '').trim();

    let slug = createSlug(cleanTitle);
    let hadSuffix = false;

    for (const { slug: suffix, length } of suffixPatterns) {
      if (slug.endsWith(suffix)) {
        slug = slug.slice(0, -length);
        hadSuffix = true;
        break;
      }
    }

    const rawDescription: string | undefined = recipe?.data?.description ?? recipe?.description;
    const descKey = rawDescription ? createSlug(rawDescription.trim()) : undefined;
    const nutKey = getNutrientSignature(recipe);

    // Only coalesce by description when we also have a nutrition signature.
    if (descKey && nutKey) {
      const composite = `${descKey}||nut:${nutKey}`;
      if (descNutToGroupSlug.has(composite)) {
        slug = descNutToGroupSlug.get(composite)!;
      } else {
        descNutToGroupSlug.set(composite, slug);
      }
    }

    if (!grouped.has(slug)) grouped.set(slug, {});
    const entry = grouped.get(slug)!;

    const current: Entry = {
      recipe,
      strippedTitle: cleanTitle,
      hadSuffix,
      hadBracketPrefix,
      descKey,
      nutKey,
    };

    if (hadBracketPrefix) {
      if (!entry.bracketed || score(current) > score(entry.bracketed)) entry.bracketed = current;
    } else {
      if (!entry.base || score(current) > score(entry.base)) entry.base = current;
    }
  }

  const deduplicated: any[] = [];

  for (const [slug, { base, bracketed }] of grouped.entries()) {
    const chosen = base ?? bracketed;
    if (!chosen) continue;

    const out = { ...chosen.recipe };

    if (out.data && typeof out.data === 'object') {
      out.data = { ...out.data, title: chosen.strippedTitle };
    }

    out.id = slug;
    deduplicated.push(out);
  }

  return deduplicated;
};
