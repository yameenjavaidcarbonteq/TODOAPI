const sinon from'sinon');
const chai from'chai');
const expect = chai.expect;
const todosController from'../controllers/todosController');
const Todo from'../models/todo');
const User from'../models/user');

describe('todosController', () => {
  describe('createTodo', () => {
    it('should create a new todo and return it', async () => {
      // Arrange
      const req = { body: { title: 'New todo', completed: false }, user: { _id: 'user123' } };
      const res = { json: sinon.spy() };
      const next = sinon.spy();
      const UserStub = sinon.stub(User, 'findById').returns({ _id: 'user123' });
      const TodoStub = sinon.stub(Todo.prototype, 'save').returns({ _id: 'todo123', title: 'New todo', completed: false, user: 'user123' });

      // Act
      await todosController.createTodo(req, res, next);

      // Assert
      expect(UserStub.calledOnceWith('user123')).to.be.true;
      expect(TodoStub.calledOnceWith({ title: 'New todo', completed: false, user: 'user123' })).to.be.true;
      expect(res.json.calledOnceWith({ _id: 'todo123', title: 'New todo', completed: false, user: 'user123' })).to.be.true;
      expect(next.notCalled).to.be.true;

      // Clean up
      UserStub.restore();
      TodoStub.restore();
    });

    it('should call next() with an error if there is a database error', async () => {
      // Arrange
      const req = { body: { title: 'New todo', completed: false }, user: { _id: 'user123' } };
      const res = { json: sinon.spy() };
      const next = sinon.spy();
      const UserStub = sinon.stub(User, 'findById').throws(new Error('User error'));
      
      // Act
      await todosController.createTodo(req, res, next);

      // Assert
      expect(UserStub.calledOnceWith('user123')).to.be.true;
      expect(res.json.notCalled).to.be.true;
      expect(next.calledOnceWith(new Error('User error'))).to.be.true;

      // Clean up
      UserStub.restore();
    });
  });
});