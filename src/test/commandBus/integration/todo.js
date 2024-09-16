const { TodoService } = require('./todoService');

describe('TodoService', () => {
  let service;

  beforeEach(() => {
    // Create a new instance of the TodoService class before each test
    service = new TodoService(/* pass in a mock repository */);
  });

  describe('create', () => {
    it('should add a new todo to the repository', async () => {
      // Create a new todo
      const todo = {
        title: 'My Todo',
        description: 'This is my todo',
        status: 'incomplete',
        userId: 123
      };

      // Call the create method on the service
      const createdTodo = await service.create(todo);

      // Verify that the todo was added to the repository with the correct properties
      expect(createdTodo).toEqual({
        id: expect.any(Number), // The ID will be generated by the repository
        title: 'My Todo',
        description: 'This is my todo',
        status: 'incomplete',
        userId: 123
      });
    });
  });

  describe('findAll', () => {
    it('should return all todos from the repository', async () => {
      // Add some test todos to the repository
      await service.create({
        title: 'Todo 1',
        description: 'This is my first todo',
        status: 'incomplete',
        userId: 123
      });

      await service.create({
        title: 'Todo 2',
        description: 'This is my second todo',
        status: 'incomplete',
        userId: 123
      });

      // Call the findAll method on the service
      const todos = await service.findAll();

      // Verify that the todos array contains the expected todos
      expect(todos).toEqual([
        {
          id: expect.any(Number), // The ID will be generated by the repository
          title: 'Todo 1',
          description: 'This is my first todo',
          status: 'incomplete',
          userId: 123
        },
        {
          id: expect.any(Number), // The ID will be generated by the repository
          title: 'Todo 2',
          description: 'This is my second todo',
          status: 'incomplete',
          userId: 123
        }
      ]);
    });
  });

  
});