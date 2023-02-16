const storeFactory = require('../../store/storeFactory');
const { v4: uuidv4 } = require('uuid');

class TodoController {

  constructor()
  {
    this.TodoStore = storeFactory.createStore(process.env.DBTYPE); 
    
    this.createTodo = this.createTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
  }
  
  async createTodo (req, res) 
  {
    try 
    {
      const temp = req.body;
      temp.id = uuidv4();
      
      const todo = await this.TodoStore.createTodo(temp);
      res.status(201).json({ todo });
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getTodos (req, res) {
    try {
      console.log("In get");
      const todos = await this.TodoStore.getTodos();
      res.status(200).json({ todos });

    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getTodoById (req, res) {
    try 
    {
      const todo = await this.TodoStore.getTodoById(req.params.id);
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
  }

  async updateTodo (req, res) {
    try 
    {
      const todo = await this.TodoStore.updateTodo(req.params.id, req.body);
      if (!todo) 
      {
        return res.status(404).send('Todo not found');
      }
      res.status(200).json({ todo });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
  async deleteTodo (req, res) {
    try {
      const todo = await this.TodoStore.deleteTodo(req.params.id);
      if (!todo) {
        return res.status(404).send('Todo not found');
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
module.exports = TodoController;
