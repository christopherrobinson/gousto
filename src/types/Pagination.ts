export interface PaginationProps {
  baseUrl: string;
  currentPage: number;
  forceQueryString?: boolean;
  totalPages: number;
}
