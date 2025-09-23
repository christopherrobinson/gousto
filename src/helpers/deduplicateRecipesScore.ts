export const deduplicateRecipesScore = (recipe) => {
  let score = 0;

  if (!recipe.hadSuffix) {
    score += 1;
  }

  if (!recipe.hadBracketPrefix) {
    score += 1;
  }

  return score;
};
