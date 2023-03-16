const sinon from'sinon');
const chai from'chai');
const expect = chai.expect;
const Todo from'../models/todo');

describe('Todo', () => {
  describe('constructor', () => {
    it('should create a new todo with a title and completed status', () => {
      // Arrange & Act
      const todo = new Todo({
        title: 'New todo',
        completed: false
      });

      // Assert
      expect(todo.title).to.equal('New todo');
      expect(todo.completed).to.be.false;
    });

    it('should throw an error if the todo title is missing', () => {
      // Arrange & Act & Assert
      expect(() => new Todo({ completed: false })).to.throw('Todo title is missing');
    });

    it('should throw an error if the completed status is missing', () => {
      // Arrange & Act & Assert
      expect(() => new Todo({ title: 'New todo' })).to.throw('Todo completed status is missing');
    });
  });

  describe('updateCompletedStatus', () => {
    it('should update the completed status of an existing todo', () => {
      // Arrange
      const todo = new Todo({
        title: 'New todo',
        completed: false
      });
      const saveStub = sinon.stub(todo, 'save').returns(todo);

      // Act
      todo.updateCompletedStatus(true);

      // Assert
      expect(todo.completed).to.be.true;
      expect(saveStub.calledOnce).to.be.true;

      // Clean up
      saveStub.restore();
    });
  });

describe('delete', () => {
    it('should delete an existing todo by ID', async () => {
      // Arrange
      const todo = new Todo({
        title: 'New todo',
        completed: false
      });
      const findByIdAndDeleteStub = sinon.stub(Todo, 'findByIdAndDelete').returns(todo);

      // Act
      await Todo.delete(todo._id);

      // Assert
      expect(findByIdAndDeleteStub.calledOnceWith(todo._id)).to.be.true;

      // Clean up
      findByIdAndDeleteStub.restore();
    });
  });
});
