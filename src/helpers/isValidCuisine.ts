export const isValidCuisine = async (cuisine: string): Promise<boolean> => {
  const { data, error } = await supabaseClient
    .from('recipes')
    .select('cuisine', { distinct: true });

  if (error || !data) {
    return false;
  }

  const uniqueCuisines = [
    ...new Set(
      data
        .map(row => createSlug(row?.cuisine))
        .filter(c => c && c.trim() !== '')
    )
  ];

  return uniqueCuisines.includes(cuisine);
};
