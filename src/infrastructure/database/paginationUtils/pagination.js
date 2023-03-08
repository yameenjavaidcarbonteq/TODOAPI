class Pagination {
    constructor(dao) {
      this.dao = dao;
      this.pageNumber = 1;
      this.pageLimit = 10;
      this.total = 0;
      this.totalPages = 0;
      this.data = [];
    }
  
    async getPage(pageNumber, pageLimit) {
      this.pageNumber = pageNumber;
      this.pageLimit = pageLimit;
  
      const [results, total] = await Promise.all([
        this.dao.getPaginatedData(this.pageNumber, this.pageLimit),
        this.dao.getCount(),
      ]);
  
      this.total = total;
      this.totalPages = Math.ceil(total / this.pageLimit);
      this.data = results;
  
      return this;
    }
  
    hasNextPage() {
      return this.pageNumber < this.totalPages;
    }
  
    hasPreviousPage() {
      return this.pageNumber > 1;
    }
  
    getNextPageLink() {
      return this.hasNextPage() ? `?pageNumber=${this.pageNumber + 1}&pageLimit=${this.pageLimit}` : null;
    }
  
    getPreviousPageLink() {
      return this.hasPreviousPage() ? `?pageNumber=${this.pageNumber - 1}&pageLimit=${this.pageLimit}` : null;
    }
  }

  module.exports = Pagination;