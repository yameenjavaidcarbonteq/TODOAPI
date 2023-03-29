const { TodoHandler } = require('./todoHandler');
const { TodoService } = require('./todoService');
const sinon = require('sinon');

describe('TodoHandler', () => {
  let handler;
  let service;

  beforeEach(() => {
    // Create a mock TodoService instance
    service = {
      create: sinon.stub(),
      delete: sinon.stub(),
      findAll: sinon.stub(),
      findbyId: sinon.stub(),
      update: sinon.stub()
    };

    // Create a new TodoHandler instance with the mock TodoService
    handler = new TodoHandler(service);
  });

  describe('CreateTodoHandler', () => {
    it('should call the TodoService create method with the correct arguments', async () => {
      // Create a mock CreateTodoCommand instance
      const command = {
        todoDetails: sinon.stub().returns({
          title: 'My Todo',
          description: 'This is my todo',
          status: 'incomplete',
          userId: 123
        })
      };

      // Call the CreateTodoHandler method on the TodoHandler instance
      await handler.CreateTodoHandler(command);

      // Verify that the TodoService create method was called with the correct arguments
      sinon.assert.calledOnce(service.create);
      sinon.assert.calledWithExactly(service.create, {
        title: 'My Todo',
        description: 'This is my todo',
        status: 'incomplete',
        userId: 123
      });
    });
  });

  
});