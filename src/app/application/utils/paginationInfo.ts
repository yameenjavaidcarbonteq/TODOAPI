export interface PaginationInfo {
    itemCount: number;
    totalPages: number;
    currentPage: number;
    perPage: number;
    nextPage: number | null;
    prevPage: number | null;
  }