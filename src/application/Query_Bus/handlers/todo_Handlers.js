import PaginationData from'@application/Utils/PaginationData';
import PaginationOptions from'@application/Utils/PaginationOptions';


export class GetTodoByIdHandler {
    constructor(todoService) {
      this.todoService = todoService;
}

    async handle(query) {
      const todo = await this.todoService.findbyid(query.id);
      if (!todo) {
        throw new Error(`No post found with id: ${query.id}`);
      }
      return todo;
    }
}
  
export class GetTodosHandler {
    constructor(todoService) {
      this.todoService = todoService;
    }
  
    async handle(query) {
      const { pageNumber, pageLimit } = query;
      const paginationOptions = new PaginationOptions(pageNumber, pageLimit);
      const todos = await this.todoService.getPaginatedData(paginationOptions.offset(), paginationOptions.limit());
      const totalTodos = await this.todoService.countAll();
      const paginationData = new PaginationData(paginationOptions, totalTodos);
      todos.forEach((todo) => paginationData.addItem(todo));
      return paginationData.getPaginatedData();
    }
}


  