import { blogSchema } from '@/schema/blog.ts'
import { categoriesSchema } from '@/schema/categories.ts'
import { cuisinesSchema } from '@/schema/cuisines.ts'
import { pagesSchema } from '@/schema/pages.ts'
import { productsSchema } from '@/schema/products.ts'
import { recipesSchema } from '@/schema/recipes.ts'

export const collections = {
  blog: defineCollection({
    loader: glob({
      base: './src/content/blog',
      pattern: '**/[^_]*.md',
      retainBody: false,
    }),
    schema: blogSchema,
  }),
  categories: defineCollection({
    loader: glob({
      base: './src/content/categories',
      pattern: '**/[^_]*.md',
      retainBody: false,
    }),
    schema: categoriesSchema,
  }),
  cuisines: defineCollection({
    loader: glob({
      base: './src/content/cuisines',
      pattern: '**/[^_]*.md',
      retainBody: false,
    }),
    schema: cuisinesSchema,
  }),
  pages: defineCollection({
    loader: glob({
      base: './src/content/pages',
      pattern: '**/[^_]*.md',
      retainBody: false,
    }),
    schema: pagesSchema,
  }),
  products: defineCollection({
    loader: glob({
      base: './src/content/products',
      pattern: '**/[^_]*.json',
      retainBody: false,
    }),
    schema: productsSchema,
  }),
  recipes: defineCollection({
    loader: glob({
      base: './src/content/recipes',
      pattern: '**/[^_]*.json',
      retainBody: false,
    }),
    schema: recipesSchema,
  }),
}
