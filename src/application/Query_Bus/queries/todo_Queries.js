export class GetTodoByIdQuery {
    constructor(id) {
      this.id = id;
    }
}
  
export class GetTodosQuery {
    constructor(pageNumber, pageLimit) {
      this.pageNumber = pageNumber;
      this.pageLimit = pageLimit;
    }
}
