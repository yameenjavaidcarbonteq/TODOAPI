describe('usersController', () => {
    describe('createUser', () => {
      // ... existing test cases ...
  
      it('should call next() with an error if the request body is missing', async () => {
        // Arrange
        const req = {};
        const res = { json: sinon.spy() };
        const next = sinon.spy();
  
        // Act
        await usersController.createUser(req, res, next);
  
        // Assert
        expect(next.calledOnceWith(new Error('Request body is missing'))).to.be.true;
      });
    });
  
    describe('loginUser', () => {
      // ... existing test cases ...
  
      it('should call next() with an error if the request body is missing', async () => {
        // Arrange
        const req = {};
        const res = { json: sinon.spy() };
        const next = sinon.spy();
  
        // Act
        await usersController.loginUser(req, res, next);
  
        // Assert
        expect(next.calledOnceWith(new Error('Request body is missing'))).to.be.true;
      });
    });
  
    describe('getUserById', () => {
      it('should return the user with the given ID', async () => {
        // Arrange
        const req = { params: { userId: 'user123' } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        const userStub = sinon.stub(User, 'findById').returns({ _id: 'user123', username: 'testuser', password: 'testpassword' });
  
        // Act
        await usersController.getUserById(req, res, next);
  
        // Assert
        expect(userStub.calledOnceWith('user123')).to.be.true;
        expect(res.json.calledOnceWith({ _id: 'user123', username: 'testuser', password: 'testpassword' })).to.be.true;
        expect(next.notCalled).to.be.true;
  
        // Clean up
        userStub.restore();
      });
  
      it('should call next() with an error if the user with the given ID is not found', async () => {
        // Arrange
        const req = { params: { userId: 'user123' } };
        const res = { json: sinon.spy() };
        const next = sinon.spy();
        const userStub = sinon.stub(User, 'findById').returns(null);
  
        // Act
        await usersController.getUserById(req, res, next);
  
        // Assert
        expect(userStub.calledOnceWith('user123')).to.be.true;
        expect(res.json.notCalled).to.be.true;
        expect(next.calledOnceWith(new Error('User not found'))).to.be.true;
  
        // Clean up
        userStub.restore();
      });
    });
  });
  