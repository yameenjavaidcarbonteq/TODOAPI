const logger = require('../../infrastructure/logger/index');
const Service = require('../../app/services/user');
const config = require('../../infrastructure/config/index');

class UserController {
  constructor() {
    this.fetchUsersByProperty = this.fetchUsersByProperty.bind(this);
    this.fetchUserById = this.fetchUserById.bind(this);
    this.addNewUser = this.addNewUser.bind(this);

    this.service = new Service(config.dbtype);
  }

  async fetchUsersByProperty(req, res, next) {
    try {
      const params = {};
      const response = {};

      // Dynamically created query params based on endpoint params
      for (const key in req.query) {
        if (Object.prototype.hasOwnProperty.call(req.query, key)) {
          params[key] = req.query[key];
        }
      }
      // predefined query params (apart from dynamically) for pagination
      params.page = params.page ? parseInt(params.page, 10) : 1;
      params.perPage = params.perPage ? parseInt(params.perPage, 10) : 10;

      const users = await this.service.findByProperty(params);
      response.users = users;
      const totalItems = await this.service.countAll(params, dbRepository);
      response.totalItems = totalItems;
      response.totalPages = Math.ceil(totalItems / params.perPage);
      response.itemsPerPage = params.perPage;
      res.json(response);
    } catch (error) {
      console.error(`Error fetching users by property: ${error.message}`);
      next(error);
    }
  }

  async fetchUserById(req, res, next) {
    try {
      const user = await findbyid(req.params.id);
      res.json(user);
    } catch (error) {
      console.error(`Error fetching user by id: ${error.message}`);
      next(error);
    }
  }

  async addNewUser(req, res, next) {
    try {
      const { username, password, email, createdAt } = req.body;
      const user = await addUser(username, password, email, createdAt);
      res.json(user);
    } catch (error) {
      console.error(`Error adding new user: ${error.message}`);
      next(error);
    }
  }
}


module.exports = UserController;