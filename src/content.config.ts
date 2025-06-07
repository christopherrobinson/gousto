import { categoriesSchema } from '@/schema/categories.ts'
import { cuisinesSchema } from '@/schema/cuisines.ts'
import { pagesSchema } from '@/schema/pages.ts'
import { recipesSchema } from '@/schema/recipes.ts'

export const collections = {
  categories: defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/categories' }),
    schema: categoriesSchema,
  }),
  cuisines: defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/cuisines' }),
    schema: cuisinesSchema,
  }),
  pages: defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/pages' }),
    schema: pagesSchema,
  }),
  recipes: defineCollection({
    loader: glob({ pattern: '**/[^_]*.json', base: './src/content/recipes' }),
    schema: recipesSchema,
  }),
}
