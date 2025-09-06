export const productsSchema = ({ image }) => z.object({
  keywords: z.array(z.string()),
  name: z.string(),
  url: z.string().url(),
});
