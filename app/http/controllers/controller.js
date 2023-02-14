const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const TodoService = require('../services/todo.services');
const { v4: uuidv4 } = require('uuid');
const express = require('express');


class Controller {
    constructor() {
        this.router = express.Router();
    }
    
    static create(type) {
      if (type === 'todo') {
        return new TodoController();
      } else if (type === 'user') {
        return new UserController();
      } else {
        throw new Error('Invalid type');
      }
    }
  }


  
  
  
  class UserController extends Controller{
  
    constructor()
    {
      super();
    }
    
    async register (req, res) {
      const { username, password } = req.body;
      try {
        const user = new User({ username, password });
        user.password = await bcrypt.hash(user.password, 8);
        await user.save();
        req.session.user = user;
        res.status(200).send({ auth: true });
        
      } catch (error) {
        res.status(500).send(error.message);
      }
    };
  
    async login (req, res) {
        const { username, password } = req.body;
        
        console.log(username,password);
        try 
        {
          const user = await User.findOne({ username });
          if (!user) return res.status(404).send('No user found');
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) 
              return res.status(401).send('Invalid password');
          req.session.user = user;
          res.status(200).send({ auth: true});
        } 
        catch (error) 
        {
          res.status(500).send(error.message);
        }
    };
  
    async logout (req, res) {
      req.session.destroy((err) => {
            if (err) return res.status(500).send(err);
            res.status(200).send({ logout: true});
          });
        
    };
  }

  class TodoController extends Controller {

    constructor()
    {
      super();
    }
  
  async createTodo (req, res) {
    try {
      
      todo = await TodoService.createTodo(req.body);
      res.status(201).json({ todo });
      
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  async getTodos (req, res) {
    try {
      const todos = await TodoService.getTodos();
      res.status(200).json({ todos });
  
    } catch (error) {
      res.status(500).send(error.message);
    }
  };
  
  async getTodoById (req, res) {
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
  
  async updateTodo (req, res) {
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
  
  async deleteTodo (req, res) {
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
  }
module.exports = Controller;