const adapter = require('../../store/stores/adapter');



class TodoController {

  constructor()
  {
    this.createTodo = this.createTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    
    
    this.adapter = new adapter("mongoose","todo");
    // this.adapter = new adapter("sequelize","todo");
    
  }
  
  async createTodo (req, res) 
  {
    try 
    {
      console.log("in create todo controller");
      const todo = await this.adapter.create(req.body);
      res.status(201).json({ todo });
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getTodos (req, res) {
    try {
      
      const todos = await this.adapter.find({ id: req.params.id });
      res.status(200).json({ todos });

    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getTodoById (req, res) {
    try 
    {
      const todo = await this.adapter.findOne({ id: req.params.id });
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
      const todo = await this.adapter.update(req.params.id, req.body);
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
      const todo = await this.adapter.delete(req.params.id);
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
