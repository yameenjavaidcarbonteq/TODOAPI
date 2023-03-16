import PaginationInfo from './PaginationInfo';

export class PaginationData {
  constructor(paginationOptions, itemCount) {
    this.paginationOptions = paginationOptions;
    this.itemCount = itemCount;
    this.items = [];
  }

  totalPages() {
    return Math.ceil(this.itemCount , this.paginationOptions.limit());
  }

  addItem(item) {
    this.items.push(item);
  }

  hasNext() {
    return this.paginationOptions.getCurrentPage() < this.totalPages();
  }

  nextPage() {
    return this.paginationOptions.getCurrentPage() + 1;
  }

  hasPrev() {
    return this.paginationOptions.getCurrentPage() > 1;
  }

  prevPage() {
    return this.paginationOptions.getCurrentPage() - 1;
  }

  getPaginatedData() {
    const paginationInfo = new PaginationInfo(
      this.itemCount,
      this.totalPages(),
      this.paginationOptions.getCurrentPage(),
      this.paginationOptions.limit(),
      this.hasNext() ? this.nextPage() : null,
      this.hasPrev() ? this.prevPage() : null
    );

    return {
      status: 'success',
      paginationInfo,
      data: this.items,
    };
  }
}
