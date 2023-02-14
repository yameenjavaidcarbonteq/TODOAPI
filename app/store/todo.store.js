const Todo = require('../models/todo.model');

const createTodo = async (data) => {
  const todo = await Todo.create(data);
  return todo;
};

const getTodos = async () => {
    // const todos = await Todo.findAll();
    
    const todos = await adapter.find('todos', {});

    return todos;
};

const getTodoById = async (id) => {
  const todo = await Todo.findByPk(id);
  return todo;
};

const updateTodo = async (id, data) => {
  const [updated] = await Todo.update(data, { where: { id } });
  if (!updated) {
    return null;
  }
  const todo = await Todo.findByPk(id);
  return todo;
};

const deleteTodo = async (id) => {
  const todo = await Todo.findByPk(id);
  if (!todo) {
    return null;
  }
  await todo.destroy();
  return todo;
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
