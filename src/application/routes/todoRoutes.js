const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const { TodoUseCases } = require('../usecases');

router.get('/', authMiddleware, async (req, res, next) => {
  try {
    const todos = await TodoUseCases.getAllTodos();
    res.json(todos);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const todo = await TodoUseCases.getTodoById(req.params.id);
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

router.post('/', authMiddleware, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const todo = await TodoUseCases.createTodo({ title, description });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authMiddleware, async (req, res, next) => {
  try {
    const { title, description, status } = req.body;
    const todo = await TodoUseCases.updateTodo({
      id: req.params.id,
      title,
      description,
      status,
    });
    res.json(todo);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authMiddleware, async (req, res, next) => {
  try {
    const result = await TodoUseCases.deleteTodoById(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;