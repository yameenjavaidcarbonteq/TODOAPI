const express = require('express');
const TodoController = require('../controllers/todo.controller');
const authMiddleware = require("../../middlewares/authMiddleware");



// Use the middleware to authenticate from session token in cookies
// router.use(authMiddleware);


class TodoRouter{

    constructor(adapter)
    {
        console.log("In Router Constructor");
        this.TodoController = new TodoController(adapter);
        this.router = express.Router();
    }
    createRoutes()
    {
        this.router.post('/', this.TodoController.createTodo.bind(this));
        this.router.get('/', this.TodoController.getTodos);
        this.router.get('/:id/', this.TodoController.getTodoById);
        this.router.put('/:id/edit', this.TodoController.updateTodo);
        this.router.delete('/:id/delete', this.TodoController.deleteTodo);
        return this.router;
    }
}
module.exports = TodoRouter;
