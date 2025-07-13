export const recipesSchema = () => z.object({
  allergens: z.array(z.string()),
  basics: z.array(z.string()),
  categories: z.array(z.string()),
  cooking_instructions: z.array(
    z.object({
      image: z.string().optional(),
      instruction: z.string(),
      order: z.number(),
    }),
  ),
  cuisine: z.string().nullish(),
  description: z.string(),
  gousto_id: z.string(),
  image: z.string(),
  ingredients: z.array(
    z.object({
      allergens: z.array(z.string()),
      gousto_uuid: z.string(),
      image: z.string().optional(),
      label: z.string().nullish(),
    })
  ),
  nutritional_information: z.object({
    per_hundred_grams: z.object({
      carbs_mg: z.number().nullish(),
      carbs_sugars_mg: z.number().nullish(),
      energy_kcal: z.number().nullish(),
      energy_kj: z.number().nullish(),
      fat_mg: z.number().nullish(),
      fat_saturates_mg: z.number().nullish(),
      fibre_mg: z.number().nullish(),
      net_weight_mg: z.number().nullish(),
      protein_mg: z.number().nullish(),
      salt_mg: z.number().nullish(),
    }),
    per_portion: z.object({
      carbs_mg: z.number().nullish(),
      carbs_sugars_mg: z.number().nullish(),
      energy_kcal: z.number().nullish(),
      energy_kj: z.number().nullish(),
      fat_mg: z.number().nullish(),
      fat_saturates_mg: z.number().nullish(),
      fibre_mg: z.number().nullish(),
      net_weight_mg: z.number().nullish(),
      protein_mg: z.number().nullish(),
      salt_mg: z.number().nullish(),
    })
  }),
  portion_sizes: z.record(z.string(), z.object({
    is_offered: z.boolean(),
    ingredients_skus: z.array(z.string()).optional(),
  })).optional(),
  prep_time_minutes: z.record(z.string(), z.string().nullable()),
  rating: z.object({
    average: z.number().nullish(),
    count: z.number().nullish(),
  }).optional(),
  title: z.string(),
  url: z.string(),
})
