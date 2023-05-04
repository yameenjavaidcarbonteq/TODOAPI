import { PaginationInfo } from "./paginationInfo";
import { PaginationOptions } from "./paginationOptions";

export class PaginationData<T> {
    private paginationOptions: PaginationOptions;
    private itemCount: number;
    private items: T[];
  
    constructor(paginationOptions: PaginationOptions, itemCount: number) {
      this.paginationOptions = paginationOptions;
      this.itemCount = itemCount;
      this.items = [];
    }
  
    public totalPages(): number {
      return Math.ceil(this.itemCount / this.paginationOptions.limit());
    }
  
    public addItem(item: T): void {
      this.items.push(item);
    }
  
    public hasNext(): boolean {
      return this.paginationOptions.getCurrentPage() < this.totalPages();
    }
  
    public nextPage(): number {
      return this.paginationOptions.getCurrentPage() + 1;
    }
  
    public hasPrev(): boolean {
      return this.paginationOptions.getCurrentPage() > 1;
    }
  
    public prevPage(): number {
      return this.paginationOptions.getCurrentPage() - 1;
    }
  
    public getPaginatedData(): {paginationInfo: any, data: T[]} {
      const paginationInfo : PaginationInfo = {
        itemCount: this.itemCount,
        totalPages: this.totalPages(),
        currentPage: this.paginationOptions.getCurrentPage(),
        perPage: this.paginationOptions.limit(),
        nextPage: this.hasNext() ? this.nextPage() : null,
        prevPage: this.hasPrev() ? this.prevPage() : null,
      };
  
      return {
        paginationInfo,
        data: this.items,
      };
    }
}

  