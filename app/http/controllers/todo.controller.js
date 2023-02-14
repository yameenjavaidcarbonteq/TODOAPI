const TodoService = require('../../services/todo.services');
const { v4: uuidv4 } = require('uuid');

const createTodo = async (req, res) => {
  try 
  {
    const temp = req.body;
    temp.id = uuidv4();
    
    todo = await TodoService.createTodo(temp);
    res.status(201).json({ todo });
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTodos = async (req, res) => {
  try {
    const todos = await TodoService.getTodos();
    res.status(200).json({ todos });

  } catch (error) {
    res.status(500).send(error.message);
  }
};

const getTodoById = async (req, res) => {
  try 
  {
    const todo = await TodoService.getTodoById(req.params.id);
    if (!todo) 
    {
      return res.status(404).send('Todo not found');
    }
    res.status(200).json({ todo });
  } 
  catch (error) 
  {
    res.status(500).send(error.message);
  }
};

const updateTodo = async (req, res) => {
  try 
  {
    const todo = await TodoService.updateTodo(req.params.id, req.body);
    if (!todo) 
    {
      return res.status(404).send('Todo not found');
    }
    res.status(200).json({ todo });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const todo = await TodoService.deleteTodo(req.params.id);
    if (!todo) {
      return res.status(404).send('Todo not found');
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
};
