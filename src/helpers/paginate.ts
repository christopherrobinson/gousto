export function paginate<T>(
  items: T[],
  options: { currentPage: number, pageSize: number },
) {
  const { currentPage, pageSize } = options;
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  return {
    currentPage: safePage,
    data: items.slice(startIndex, endIndex),
    pageSize,
    totalItems,
    totalPages,
  };
}
