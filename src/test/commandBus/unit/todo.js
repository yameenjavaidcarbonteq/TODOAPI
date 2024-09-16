const { CreateTodoCommand } = require('./createTodoCommand');

describe('CreateTodoCommand', () => {
  it('should set properties correctly', () => {
    const title = 'My Todo';
    const description = 'This is my todo';
    const status = 'incomplete';
    const userId = 123;
    
    const command = new CreateTodoCommand(title, description, status, userId);

    expect(command.title).toEqual(title);
    expect(command.description).toEqual(description);
    expect(command.status).toEqual(status);
    expect(command.userId).toEqual(userId);
  });

  it('should return correct todoDetails', () => {
    const title = 'My Todo';
    const description = 'This is my todo';
    const status = 'incomplete';
    const userId = 123;

    const command = new CreateTodoCommand(title, description, status, userId);

    expect(command.todoDetails()).toEqual({
      title,
      description,
      status,
      userId
    });
  });
});