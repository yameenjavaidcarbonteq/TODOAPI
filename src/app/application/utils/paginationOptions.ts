export class PaginationOptions {
    private currentPage: number;
    private perPage: number;
  
    constructor(currentPage: number = 1, perPage: number = 20) {
      this.currentPage = currentPage;
      this.perPage = perPage;
    }
  
    public limit(): number {
      return this.perPage;
    }
  
    public getCurrentPage(): number {
      return this.currentPage;
    }
  
    public offset(): number {
      return (this.currentPage - 1) * this.limit();
    }
}
  
