export const updateQueryParams = (currentUrl: URL, updates: Array<Record<string, string | false>>): string => {
  const params = new URLSearchParams(currentUrl.search);

  for (const update of updates) {
    for (const [key, value] of Object.entries(update)) {
      if (value === false) {
        params.delete(key);
      }
      else {
        params.set(key, value);
      }
    }
  }

  const sortedKeys = Array.from(params.keys()).sort();
  const sortedParams = new URLSearchParams();

  for (const key of sortedKeys) {
    sortedParams.set(key, params.get(key)!);
  }

  const queryString = sortedParams.toString();

  return queryString ? `${currentUrl.pathname}?${queryString}` : currentUrl.pathname;
}
