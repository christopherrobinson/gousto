import { pagesSchema } from '@/schema/pages.ts'
import { recipesSchema } from '@/schema/recipes.ts'

export const collections = {
  pages: defineCollection({ schema: pagesSchema, type: 'content' }),
  recipes: defineCollection({ schema: recipesSchema, type: 'data' }),
}
