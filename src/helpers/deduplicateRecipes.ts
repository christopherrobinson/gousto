const suffixLeads = ['and', 'with'] as const;
const premiumRegex = /^\[(?:prem|premium)\s+(?:pro|prot\.?|protein(?:s)?)\]\s*/i;
const bracketPrefixRegex = /^\([^)]+\)\s*/;

type Lead = (typeof suffixLeads)[number];
type NutritionalInfo = Record<string, unknown>;
type RecipeLike = {
  id?: string;
  title?: string;
  description?: string;
  nutritional_information?: { per_hundred_grams?: NutritionalInfo };
  data?: {
    title?: string;
    description?: string;
    nutritional_information?: { per_hundred_grams?: NutritionalInfo };
  };
  gousto_id?: number;
  updated_at?: string;
};

type Entry = {
  recipe: RecipeLike;
  strippedTitle: string;
  hadSuffix: boolean;
  hadBracketPrefix: boolean;
  descKey?: string;
  nutKey?: string;
};

type SuffixPattern = { slug: string; length: number; lead: Lead; object: string };

/** Build slug-based suffix patterns once (no regex needed here). */
const buildSuffixPatterns = (): SuffixPattern[] => {
  const patterns: SuffixPattern[] = [];
  for (const lead of suffixLeads) {
    for (const object of ignoredRecipeSuffixes) {
      const comboSlug = `-${lead}-${object}`; // e.g. "-with-dessert"
      patterns.push({ slug: comboSlug, length: comboSlug.length, lead, object });
    }
  }
  return patterns;
};

const suffixPatterns = buildSuffixPatterns();

/** Nutrition helpers */
const getPerHundred = (r: RecipeLike) =>
  r?.data?.nutritional_information?.per_hundred_grams ??
  r?.nutritional_information?.per_hundred_grams;

const getNutrientSignature = (r: RecipeLike, decimals = 1): string | undefined => {
  const info = getPerHundred(r);
  if (!info || typeof info !== 'object') return undefined;

  const ordered: Record<string, number> = {};
  const factor = Math.pow(10, decimals);
  for (const key of Object.keys(info).sort()) {
    const val = (info as any)[key];
    if (typeof val === 'number' && isFinite(val)) {
      ordered[key] = Math.round(val * factor) / factor;
    }
  }
  if (!Object.keys(ordered).length) return undefined;
  return JSON.stringify(ordered);
};

/**
 * Build a single trailing matcher for the *specific* object we matched in the slug.
 * Example object "ready-to-heat-rice" -> matches "with ready to heat rice" at the *end*.
 */
const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const buildObjectTailRegex = (lead: Lead, objectSlug: string) => {
  const tokens = objectSlug.split('-').filter(Boolean).map(escapeRe);
  const objectPattern = tokens.join('[\\s\\-–—,&]+');
  return new RegExp(String.raw`(?:[\s\-–—,]+${lead}\b[\s\-–—,&]+${objectPattern})$`, 'i');
};

// ---------- main ----------
export const deduplicateRecipes = (
  recipes: RecipeLike[],
  removeXL: boolean = false
): RecipeLike[] => {
  const grouped = new Map<string, { base?: Entry; bracketed?: Entry }>();
  const descNutToGroupSlug = new Map<string, string>();

  for (const recipe of recipes) {
    const rawTitle: string | undefined = recipe?.data?.title ?? recipe?.title;
    const title = rawTitle?.trim();
    if (!title) continue;

    const premiumStripped = title.replace(premiumRegex, '').trim();
    if (removeXL && /(^|\W)XL(\W|$)/i.test(premiumStripped)) continue;

    const hadBracketPrefix = bracketPrefixRegex.test(premiumStripped);
    const cleanTitle = premiumStripped.replace(bracketPrefixRegex, '').trim();

    let slug = createSlug(cleanTitle);
    let displayTitle = cleanTitle;
    let hadSuffix = false;
    let matched: SuffixPattern | undefined;

    // Remove exactly one suffix from the slug (delete 'break' to strip stacked)
    for (const pat of suffixPatterns) {
      if (slug.endsWith(pat.slug)) {
        slug = slug.slice(0, -pat.length);
        hadSuffix = true;
        matched = pat;
        break;
      }
    }

    // Precisely remove the matching trailing phrase from the *title*
    if (matched) {
      const tailRe = buildObjectTailRegex(matched.lead, matched.object);
      displayTitle = displayTitle.replace(tailRe, '').trim();
    }

    const rawDescription: string | undefined =
      recipe?.data?.description ?? recipe?.description;
    const descKey = rawDescription ? createSlug(rawDescription.trim()) : undefined;
    const nutKey = getNutrientSignature(recipe, 1);

    if (descKey && nutKey) {
      const composite = `${descKey}||nut:${nutKey}`;
      if (descNutToGroupSlug.has(composite)) {
        slug = descNutToGroupSlug.get(composite)!;
      } else {
        descNutToGroupSlug.set(composite, slug);
      }
    }

    if (!grouped.has(slug)) grouped.set(slug, {});
    const bucket = grouped.get(slug)!;

    const current: Entry = {
      recipe,
      strippedTitle: displayTitle,
      hadSuffix,
      hadBracketPrefix,
      descKey,
      nutKey,
    };

    if (hadBracketPrefix) {
      if (!bucket.bracketed || deduplicateRecipesScore(current) > deduplicateRecipesScore(bucket.bracketed)) {
        bucket.bracketed = current;
      }
    } else {
      if (!bucket.base || deduplicateRecipesScore(current) > deduplicateRecipesScore(bucket.base)) {
        bucket.base = current;
      }
    }
  }

  const deduped: RecipeLike[] = [];
  for (const [slug, { base, bracketed }] of grouped.entries()) {
    const chosen = base ?? bracketed;
    if (!chosen) continue;

    const out: RecipeLike = { ...chosen.recipe };
    out.data = out.data && typeof out.data === 'object'
      ? { ...out.data, title: chosen.strippedTitle }
      : { title: chosen.strippedTitle };
    out.id = slug;

    deduped.push(out);
  }

  return deduped;
};
