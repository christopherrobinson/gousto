export const filterNumericValues = obj =>
  Object.fromEntries(
    Object.entries(obj).filter(
      ([, value]) => typeof value === 'number' && !isNaN(value)
    )
  );
