export const nullIfEmpty = (value?: string | null) => value && value.trim() !== '' ? value : null;
