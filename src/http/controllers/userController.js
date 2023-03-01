const service = require('../../app/services/user');
const config = require('../../infrastructure/config/index');

class UserController{
  constructor()
  {
    this.fetchUsersByProperty = this.fetchUsersByProperty.bind();
    this.fetchUserById = this.fetchUserById.bind();
    this.addNewUser = this.addNewUser.bind();
    
    this.service = new service(config.dbtype);
    
  }
  
  fetchUsersByProperty (req, res, next){
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

    findByProperty(params)
      .then((users) => {
        response.users = users;
        return this.service.countAll(params, dbRepository);
      })
      .then((totalItems) => {
        response.totalItems = totalItems;
        response.totalPages = Math.ceil(totalItems / params.perPage);
        response.itemsPerPage = params.perPage;
        return res.json(response);
      })
      .catch((error) => next(error));
  };

  fetchUserById (req, res, next) {
    findById(req.params.id)
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };

  addNewUser (req, res, next){
    const { username, password, email, createdAt } = req.body;
    addUser(
      username,
      password,
      email,
      createdAt
    )
      .then((user) => res.json(user))
      .catch((error) => next(error));
  };
}

module.exports = UserController;