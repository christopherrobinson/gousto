import { blogSchema } from '@/schema/blog.ts'
import { categoriesSchema } from '@/schema/categories.ts'
import { cuisinesSchema } from '@/schema/cuisines.ts'
import { pagesSchema } from '@/schema/pages.ts'
import { productsSchema } from '@/schema/products.ts'
import { recipesSchema } from '@/schema/recipes.ts'

export const collections = {
  blog: defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
    schema: blogSchema,
  }),
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
  products: defineCollection({
    loader: glob({ pattern: '**/[^_]*.json', base: './src/content/products' }),
    schema: productsSchema,
  }),
  recipes: defineCollection({
    loader: glob({ pattern: '**/[^_]*.json', base: './src/content/recipes' }),
    schema: recipesSchema,
  }),
}
