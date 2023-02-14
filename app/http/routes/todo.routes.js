const express = require('express');
const TodoController = require('../controllers/todo.controller');
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();



// Use the middleware to authenticate from session token in cookies
router.use(authMiddleware);

router.post('/', TodoController.createTodo);
router.get('/', TodoController.getTodos);

router.get('/:id/', TodoController.getTodoById);

router.put('/:id/edit', TodoController.updateTodo);
router.delete('/:id/delete', TodoController.deleteTodo);

module.exports = router;
