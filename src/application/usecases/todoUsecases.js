
const TodoService = require('../services/TodoService');

async function createTodo ({ title, description, status }) {
  try {
    const todo = await TodoService.create({ title, description, status });
    return todo;
  } catch (error) {
    throw new Error(`Failed to create todo: ${error}`);
  }
}

async function getTodos () {
  try {
    const todos = await TodoService.getTodos();
    return todos;
  } catch (error) {
    throw new Error(`Failed to get todos`);
  }
};

async function getTodo (id) {
  try {
    const todo = await TodoService.getById(id);
    return todo;
  } catch (error) {
    throw new Error(`Failed to get todo: ${error}`);
  }
}

async function updateTodo (id, { title, description, status }) {
  try {
    const todo = await TodoService.updateById(id, { title, description, status });
    return todo;
  } catch (error) {
    throw new Error(`Failed to update todo: ${error}`);
  }
}

async function deleteTodo (id) {
  try {
    const todo = await TodoService.deleteById(id);
    return todo;
  } catch (error) {
    throw new Error(`Failed to delete todo: ${error}`);
  }
}

module.exports = {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
};