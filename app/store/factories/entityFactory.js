class EntityFactory {
    static sequelize;
  
    static initialize(sequelize) {
      EntityFactory.sequelize = sequelize;
    }
    
    static createTodo(title, description, completed) {
      const todo = new Todo(title, description, completed);
      const TodoModel = EntityFactory.sequelize.define('Todo', {
        title: DataTypes.STRING,
        description: DataTypes.STRING,
        completed: DataTypes.BOOLEAN,
      });
  
      // Save the new Todo to the database
      return TodoModel.create(todo);
    }
  
    
    static createTodo(title, description, completed) {
        return new Todo(title, description, completed);
    }
    
    static createTodoFromObject(obj) {
        return new Todo(obj.id, obj.title, obj.description, obj.status);
    }
    
    static createTodoModelFromObjectMongo(obj) {
        const todo = TodoFactory.createTodoFromObject(obj);
        return new TodoModel(todo.toObject());
    }

    static createTodoModelFromObjectSequelize(obj) {
        const todo = TodoFactory.createTodoFromObject(obj);
        return TodoModel.create(todo);
    }
    
    
    
    
    
    
    static createUser(name, email, password) {
      const user = new User(name, email, password);
      const UserModel = EntityFactory.sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
      });
  
      // Save the new User to the database
      return UserModel.create(user);
    }
  }
  
  module.exports = EntityFactory;

  //////////////////////////////



  class TodoFactory {
    static createTodoFromObject(obj) {
      return new Todo(obj.id, obj.title, obj.description, obj.status);
    }
  
    static createTodoModelFromObject(obj) {
      const todo = TodoFactory.createTodoFromObject(obj);
      return new TodoModel(todo.toObject());
    }
}



  class UserEntityFactory {
    static async createUserEntityFromObject(obj) {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
      return new UserEntity(obj.username, hashedPassword);
    }
  
    static createUserModelFromObject(obj) {
      const user = new UserEntity(obj.username, obj.password);
      return new UserModel(user.toObject());
    }
}
  
  
  
  
  
  //////////////////////////////
  
  
  const { Sequelize } = require('sequelize');
  const EntityFactory = require('./entity-factory');
  
  // Initialize the factory with a Sequelize instance
  const sequelize = new Sequelize('sqlite::memory:');
  EntityFactory.initialize(sequelize);
  
  // Use the factory to create a new Todo
  EntityFactory.createTodo('Buy groceries', 'Milk, bread, eggs', false)
    .then((todo) => console.log(todo))
    .catch((error) => console.log(error));
  
  // Use the factory to create a new User
  EntityFactory.createUser('Alice', 'alice@example.com', 'password123')
    .then((user) => console.log(user))
    .catch((error) => console.log(error));
  In this implementation, each file has a specific responsibility, making the code easier to understand and maintain.
  
  
  
  
  