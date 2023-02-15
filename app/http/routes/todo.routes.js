const express = require('express');
const controller = require('../controllers/todo.controller');
const authMiddleware = require("../../middlewares/authMiddleware");



// Use the middleware to authenticate from session token in cookies
// router.use(authMiddleware);


class TodoRouter{

    constructor(adapter)
    {
        this.TodoController = new controller(adapter);
        this.router = express.Router();
    }
    createRoutes()
    {
        router.post('/', this.TodoController.createTodo);
        router.get('/', this.TodoController.getTodos);
        router.get('/:id/', this.TodoController.getTodoById);
        router.put('/:id/edit', this.TodoController.updateTodo);
        router.delete('/:id/delete', this.TodoController.deleteTodo);
        return this.router;
    }
}
module.exports = TodoRouter;
