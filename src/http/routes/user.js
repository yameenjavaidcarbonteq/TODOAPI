const UserController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");


function userRouter(express) {
  
  const router = express.Router();
  const controller = new UserController();

  router.use(authMiddleware);
    
  router.route('/:id').get(controller.fetchUserById);
  router.route('/').get(controller.fetchUsersByProperty);
  router.route('/').post(controller.addNewUser);

  return router;
}

module.exports = userRouter;
