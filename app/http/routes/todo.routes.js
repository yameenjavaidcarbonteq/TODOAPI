const express = require('express');
const TodoController = require('../controllers/todo.controller');
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();



// Use the middleware to authenticate from session token in cookies
// router.use(authMiddleware);

const controller = new TodoController();

router.post('/', controller.createTodo);
router.get('/', controller.getTodos);

router.get('/:id/', controller.getTodoById);

router.put('/:id/edit', controller.updateTodo);
router.delete('/:id/delete', controller.deleteTodo);

module.exports = router;
