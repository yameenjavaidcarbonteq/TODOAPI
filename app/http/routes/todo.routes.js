const express = require('express');
const TodoController = require('../controllers/todo.controller');
const authMiddleware = require("../../middlewares/authMiddleware");
const router = express.Router();



// Use the middleware to authenticate from session token in cookies
// router.use(authMiddleware);

const controller = new TodoController();

router.post('/',(req,res) => controller.createTodo(req,res));
router.get('/', (req,res) => controller.getTodos(req,res));
router.get('/:id/', (req,res) => controller.getTodoById(req,res));
router.put('/:id/edit', (req,res) => controller.updateTodo(req,res));
router.delete('/:id/delete', (req,res) => controller.deleteTodo(req,res));

module.exports = router;
