export const envBoolean = (v: string | undefined, d = false) =>
  v === "1" || v === "true" ? true : v === "0" || v === "false" ? false : d;
