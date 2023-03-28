require('module-alias/register');
const expect = require("chai").expect;
const sinon = require("sinon");
const mongoose = require("mongoose");
const { TodoRepositoryMongoose } = require("../../../infrastructure/repositories/mongooseRepositories/TodoRepositoryMongoose");
const { TodoEntity } = require("../../../domain/Entities/TodoEntity");
const { PaginationData } = require("../../../infrastructure/utils/PaginationData");
const { PaginationOptions} = require("../../../infrastructure/utils/PaginationOptions");


describe("TodoRepositoryMongoose", () => {
  let repository;
  
  before(async () => {
    await mongoose.connect("mongodb://localhost:27017/todoapi");
    repository = new TodoRepositoryMongoose();
  });
  

  describe("findAll", () => {
    it("should return paginated list of todos", async () => {
      // create a fake todo
      const todo = TodoEntity.createFromParams({
        title: "Test Todo",
        description: "This is a test todo",
        status: false,
      });

      // add the fake todo to the repository
      await repository.create(todo);

      // define the pagination options
      const paginationOptions = new PaginationOptions(1, 10);

      // call the repository method
      const result = await repository.findAll({}, paginationOptions);

      // assert that the result is a paginated list of todos
      expect(result).to.be.an("object");
      expect(result.paginationInfo).to.have.property("perPage").that.is.equal(10);
      expect(result.paginationInfo).to.have.property("currentPage").that.is.equal(1);
    }).timeout(10000);
  });

  describe("create", () => {
    it("should create a new todo", async () => {
      // create a fake todo
      const todo = TodoEntity.createFromParams({
        title: "Test Todo",
        description: "This is a test todo",
        status: "false",
      });

      // call the repository method
      const result = await repository.create(todo);
      console.log(result);
      // assert that the result is a todo entity
      expect(result).to.be.an.instanceOf(TodoEntity);
      expect(result).to.have.property("id");
      expect(result).to.have.property("title").that.is.equal(todo.title);
      expect(result).to.have.property("description").that.is.equal(todo.description);
      expect(result).to.have.property("status").that.is.equal(todo.status);
    });
  });

  describe("update", () => {
    it("should update an existing todo", async () => {
      // create a fake todo
      const todo = TodoEntity.createFromParams({
        title: "Test Todo",
        description: "This is a test todo",
        status: "false",
      });

      // add the fake todo to the repository
      const createdTodo = await repository.create(todo);

      // update the todo
      createdTodo.title = "Updated Todo";

      // call the repository method
      const result = await repository.update(createdTodo);

      // assert that the result is a todo entity with the updated values
      expect(result).to.be.an.instanceOf(TodoEntity);
      expect(result).to.have.property("id");
      expect(result).to.have.property("title").that.is.equal("Updated Todo");
      expect(result).to.have.property("description").that.is.equal(
        todo.description
      );
      expect(result).to.have.property("status").that.is.equal(todo.status);
    });
  });

  describe("delete", () => {
    it("should delete a todo item from the database", async () => {
      // Create a new todo item
      const todo = TodoEntity.createFromParams({
        title: "Test Todo Item",
        description: "This is a test todo item",
        status: false
      });
      const repository = new TodoRepositoryMongoose();
      const createdTodo = await repository.create(todo);

      // Delete the todo item
      await repository.delete(createdTodo);

      // Verify that the todo item has been deleted
      const deletedTodo = await repository.findbyId(createdTodo.id);
      expect(deletedTodo).to.be.undefined;
    });
  });
});