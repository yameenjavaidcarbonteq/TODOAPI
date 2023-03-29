require('module-alias/register');
const expect = require("chai").expect;
const sinon = require("sinon");

const mongoose = require("mongoose");
const { UserRepositoryMongoose } = require("../../../infrastructure/repositories/mongooseRepositories/UserRepositoryMongoose");
const { UserEntity } = require ("../../../domain/Entities/UserEntity");
const userDetails = require ( "../../fakers/user");

describe("UserRepositoryMongoose", async () => {
  
  before(async () => {
    await mongoose.connect("mongodb://localhost:27017/todoapi");
    repository = new UserRepositoryMongoose();
  });

  afterEach(async () => {
    await repository.userModel.deleteMany({});
  });

  after(async () => {
    await mongoose.connection.close();
  });
  
  

  describe("find", () => {
    beforeEach(async () => {
      const user1 = UserEntity.createFromParams(userDetails);
      const user2 = UserEntity.createFromParams(userDetails);

      await repository.create(user1);
      await repository.create(user2);
    });

    it("should find all users", async () => {
      const users = await repository.find({});

      expect(users).to.be.an("array");
      expect(users).to.have.lengthOf(2);
      expect(users[0]).to.be.instanceOf(UserEntity);
      expect(users[1]).to.be.instanceOf(UserEntity);
    });

    it("should find users by name", async () => {
      
      const user = userDetails;
      user.username = "Yameen Javaid";
      
      await repository.create(UserEntity.createFromParams(user));


      const users = await repository.find({ username:  "Yameen Javaid"});

      expect(users).to.be.an("array");
      expect(users).to.have.lengthOf(1);
      expect(users[0]).to.be.instanceOf(UserEntity);
      expect(users[0].username).to.equal("Yameen Javaid");
    });
  });

  describe("create", () => {
    it("should create a new user", async () => {
      const user = UserEntity.createFromParams(userDetails);
      const createdUser = await repository.create(user);

      expect(createdUser).to.be.instanceOf(UserEntity);
      expect(createdUser.username).to.equal(user.username);
      expect(createdUser.email).to.equal(user.email);
    });
  });  
  
  describe("findbyId", () => {
    it("should find a user by ID", async () => {
      const user = UserEntity.createFromParams(userDetails);

      const createdUser = await repository.create(user);
      const foundUser = await repository.findbyId(createdUser.id);

      expect(foundUser).to.be.instanceOf(UserEntity);
      expect(foundUser.username).to.equal(user.username);
      expect(foundUser.email).to.equal(user.email);
    });
  });

  describe("findbyEmail", () => {
    it("should find a user by email", async () => {
      const user = UserEntity.createFromParams(userDetails);

      const createdUser = await repository.create(user);
      const foundUser = await repository.findbyEmail(createdUser.email);

      expect(foundUser).to.be.instanceOf(UserEntity);
      expect(foundUser.username).to.equal(user.username);
      expect(foundUser.email).to.equal(user.email);
    });
  });
});
