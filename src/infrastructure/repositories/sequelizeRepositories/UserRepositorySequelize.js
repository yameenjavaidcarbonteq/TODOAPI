const { 
  UserEntity,
  UserRepositoryPort 
} = require("@domain");
const UserModelSequelize = require("../../models/sequelizeModels/UserModelSequelize");


class UserRepositorySequelize extends UserRepositoryPort {
  constructor() {
    super();
    this.userModel = UserModelSequelize;
  }

  async findbyId(userId) {
    const user = await this.userModel.findByPk(userId);
    if (user) {
      return UserEntity.createFromObject(user.dataValues);
    }
  }

  async findByEmail(email) {
    return await this.userModel.findOne({ where: { email } });
  }

  async create(user) {
    const userDoc = await this.userModel.create(user);
    return UserEntity.createFromObject(userDoc.dataValues);
  }

  async isValid(userId) {
    const count = await this.userModel.count({ where: { id: userId } });
    return count > 0;
  }

  async update(userItem) {
    const [numUpdated, updatedUser] = await this.userModel.update(userItem, {
      where: { id: userItem.userId },
      returning: true,
    });
    if (numUpdated > 0) {
      return UserEntity.createFromObject(updatedUser[0].dataValues);
    }
  }

  async count() {
    return await this.userModel.count();
  }
}

module.exports = {
  UserRepositorySequelize
};
