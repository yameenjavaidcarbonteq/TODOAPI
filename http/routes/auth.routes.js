const Controller = require("../controllers/controller");


class AuthRoute extends Route {
    constructor() {
        super();
        this.authController = Controller.create('user');
    }

    createRoutes() {
    
        this.router.post('/login', this.authController.login.bind(this));
        this.router.post('/register', this.authController.register.bind(this));
        this.router.post('/logout', this.authController.logout.bind(this));
    }
}
module.exports = AuthRoute;