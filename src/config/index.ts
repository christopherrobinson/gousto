export const benefits = [
  '500+ recipes every month',
  '185+ veggie & vegan options',
  'No commitments!',
  'Skip or cancel for free anytime',
];
export const excludedFiles = [
  'src/pages/api/update-ingredients.ts',
  'src/pages/api/update-recipes.ts',
];
export const ignoredRecipeSuffixes = [
  'and-dessert',
  'and-dough-balls',
  'and-ready-to-heat-rice',
  'and-side',
  'and-sides',
  'with-dessert',
  'with-dough-balls',
  'with-ready-to-heat-rice',
  'with-side',
  'with-sides',
];
export const inspirationRecipeCount = 8;
export const mergedCategories = new Map([
  ['Chicken',          ['Chicken', 'Chicken Breast', 'Chicken Thigh']],
  ['Christmas',        ['Christmas', 'Christmas Inspired']],
  ['Dairy-Free',       ['Dairy-Free', 'Dairy Free']],
  ['Easter',           ['Easter', 'Easter 2']],
  ['Father\'s Day',    ['Father\'s Day', 'Father\'s Day 2']],
  ['Festive Flavours', ['Festive Flavours', 'Festive Flavours 2019']],
  ['Gluten-Free',      ['Gluten-Free', 'Gluten Free']],
  ['Plant-Based',      ['Plant-Based', 'Plant Bistro']],
  ['Pork',             ['Pork', 'Pork Fillet']]
]);
export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/recipes/', label: 'Recipes' },
];
export const postsPerPage = 6;
export const targetPortionCalories = 600;
export const recipesPerPage = 12;
export const site = {
  name: 'Gousto Recipe Search',
  url: 'https://gousto.wiki',
};
export const stopWords = new Set([
  "a", "about", "above", "after", "again", "against", "all", "am", "an", "and",
  "any", "are", "as", "at", "be", "because", "been", "before", "being", "below",
  "between", "both", "but", "by", "can", "did", "do", "does", "doing", "don",
  "down", "during", "each", "few", "for", "from", "further", "had", "has",
  "have", "having", "he", "her", "here", "hers", "herself", "him", "himself",
  "his", "how", "i", "if", "in", "into", "is", "it", "its", "itself", "just",
  "me", "more", "most", "my", "myself", "no", "nor", "not", "now", "of", "off",
  "on", "once", "only", "or", "other", "our", "ours", "ourselves", "out",
  "over", "own", "s", "same", "she", "should", "so", "some", "such", "t",
  "than", "that", "the", "their", "theirs", "them", "themselves", "then",
  "there", "these", "they", "this", "those", "through", "to", "too", "under",
  "until", "up", "very", "was", "we", "were", "what", "when", "where", "which",
  "while", "who", "whom", "why", "will", "with", "you", "your", "yours",
  "yourself", "yourselves",
]);
