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
  ingredients: z.array(
    z.object({
      allergens: z.array(z.string()),
      gousto_uuid: z.string(),
      image: z.string().optional(),
      label: z.string().nullish(),
    })
  ),
  prep_times: z.object({
    for_2: z.number(),
    for_4: z.number().nullable(),
  }),
  rating: z.object({
    average: z.number().nullish(),
    count: z.number().nullish(),
  }).optional(),
  title: z.string(),
  nutritional_information: z.object({
    per_hundred_grams: z.object({
      energy_kcal: z.number().nullish(),
      energy_kj: z.number().nullish(),
      fat_mg: z.number().nullish(),
      fat_saturates_mg: z.number().nullish(),
      carbs_mg: z.number().nullish(),
      carbs_sugars_mg: z.number().nullish(),
      fibre_mg: z.number().nullish(),
      protein_mg: z.number().nullish(),
      salt_mg: z.number().nullish(),
      net_weight_mg: z.number().nullish(),
    }),
    per_portion: z.object({
      energy_kcal: z.number().nullish(),
      energy_kj: z.number().nullish(),
      fat_mg: z.number().nullish(),
      fat_saturates_mg: z.number().nullish(),
      carbs_mg: z.number().nullish(),
      carbs_sugars_mg: z.number().nullish(),
      fibre_mg: z.number().nullish(),
      protein_mg: z.number().nullish(),
      salt_mg: z.number().nullish(),
      net_weight_mg: z.number().nullish(),
    })
  }),
  portion_sizes: z.array(
    z.object({
      ingredients_skus: z.array(
        z.object({
          code: z.string(),
          id: z.string(),
          quantities: z.object({ in_box: z.number() })
        })
      ).optional(),
      is_offered: z.boolean(),
      portions: z.number(),
    })
  ).optional(),
  image: z.string()
})
