export const categoriesSchema = () => z.object({
  meta: z.object({
    description: z.string().optional(),
    robots: z.string().optional(),
    title: z.string().optional(),
  }).optional(),
  title: z.string(),
});
