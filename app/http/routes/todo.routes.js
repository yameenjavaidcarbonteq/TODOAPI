const Route = require("./route");
const Controller = require('../controllers/controller');


class TodoRoute extends Route {
    constructor() {
        super();
        this.TodoController = Controller.create('todo');
    }

    createRoutes() {
        this.router.post('/', this.TodoController.createTodo.bind(this));
        this.router.get('/', this.TodoController.getTodos.bind(this));
        this.router.get('/:id/', this.TodoController.getTodoById.bind(this));
        this.router.put('/:id/edit', this.TodoController.updateTodo.bind(this));
        this.router.delete('/:id/delete', this.TodoController.deleteTodo.bind(this));
    }

}
module.exports = TodoRoute;
