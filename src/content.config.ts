import { categoriesSchema } from '@/schema/categories.ts'
import { pagesSchema } from '@/schema/pages.ts'
import { recipesSchema } from '@/schema/recipes.ts'

export const collections = {
  categories: defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/categories' }),
    schema: categoriesSchema,
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
