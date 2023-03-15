class GetTodoByIdQuery {
    constructor(id) {
      this.id = id;
    }
}
  
class GetTodosQuery {
    constructor(pageNumber, pageLimit) {
      this.pageNumber = pageNumber;
      this.pageLimit = pageLimit;
    }
}

module.exports = {
  GetTodoByIdQuery,
  GetTodosQuery,
}