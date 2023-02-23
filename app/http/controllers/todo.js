const config = require('../../infrastructure/config/index');
const Todo = require('../../domain/entities/todo');
const adapter = require('../../infrastructure/todo/todoadapter');

class TodoController {

  constructor()
  {
    this.createTodo = this.createTodo.bind(this);
    this.getTodos = this.getTodos.bind(this);
    this.getTodoById = this.getTodoById.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    
    this.store = new adapter(config.dbtype);
    
  }
  
  async createTodo (req, res) 
  {
    try 
    {
      const { title, description, status } = req.body;

      const todoItem = Todo.create(Todo.makeid(),title, description, status);
      const todo = await this.store.create(todoItem);
      res.status(201).json({ todo });
      
    } catch (error) {
      res.status(500).send(error.message);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  }

  async getTodos (req, res) {
    try {
      
      const todos = await this.store.find({});
      
      const todoEntities =  todos.map((todoRecord) => Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted));
      
      res.status(200).json({ todoEntities });

    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  async getTodoById (req, res) {
    try 
    {
      const { id } = req.params;
      const todoRecord = await this.store.findOne(id);

      if (!todoItem) {
        res.status(404).json({ error: `Todo item with id ${id} not found` });
      } else {
        const todoEntity = Todo.create(todoRecord.id, todoRecord.title, todoRecord.description, todoRecord.isCompleted);
        res.json(todoEntity);
      } 
    }  
    catch (error) 
    {
      res.status(500).send(error.message);
    }
  }

  async updateTodo (req, res) {
    try 
    {
      const { id } = req.params;
      const { title, description, status } = req.body;
      
      const todoItem = await this.store.findOne({'id':id});
      console.log("Found this todoItem: ",todoItem);
      if (!todoItem) {
        res.status(404).json({ error: `Todo item with id ${id} not found` });
        return;
      }
      if (title !== undefined) {
        todoItem.title = title;
      }
      if (description !== undefined) {
        todoItem.description = description;
      }
      if (status !== undefined) {
        todoItem.status = status;
      }

      console.log("Updating this TODO: ",todoItem);

      await this.store.update(todoItem);
      res.status(200).json(todoItem);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
  
  async deleteTodo (req, res) {
    try {
      const { id } = req.params;
      const todoItem = await this.store.findOne({'id':id});
      if (!todoItem) {
        res.status(404).json({ error: `Todo item with id ${id} not found` });
        return;
      }
      await this.store.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}
module.exports = TodoController;
