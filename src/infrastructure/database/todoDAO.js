class TodoDAO {
  constructor(model) {
    this.model = model;
    console.log("Constructing this for ",model);

  }

  async getPaginatedData(pageNumber, pageLimit) {
    // Handle Sequelize and Mongoose differently
    if (this.model.sequelize) {
      const offset = (pageNumber - 1) * pageLimit;
      return this.model.findAll({ offset, limit: pageLimit });
    } else if (this.model.find) {
      const skip = (pageNumber - 1) * pageLimit;
      return this.model.find().skip(skip).limit(pageLimit);
    }
  }

  async getCount() {
    // Handle Sequelize and Mongoose differently
    if (this.model.sequelize) {
      const [{ count }] = await this.model.findAndCountAll();
      return count;
    } else if (this.model.countDocuments) {
      return this.model.countDocuments();
    }
  }
}

module.exports = TodoDAO;
  