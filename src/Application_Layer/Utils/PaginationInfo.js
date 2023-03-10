class PaginationInfo {
    constructor(totalItems, totalPages, currentPage, perPage, nextPage, prevPage) {
      this.totalItems = totalItems;
      this.totalPages = totalPages;
      this.currentPage = currentPage;
      this.perPage = perPage;
      this.nextPage = nextPage;
      this.prevPage = prevPage;
    }
  }
  
  module.exports = PaginationInfo;