const UserController = require('../controllers/userController');
const authMiddleware = require("../middlewares/authMiddleware");


function userRouter(express) {
  
  const router = express.Router();
  const controller = new UserController();

  router.use(authMiddleware);
    
  router.route('/:id').get(controller.findOne);
  router.route('/').get(controller.find);
  router.route('/').post(controller.create);
  
  return router;
}

module.exports = userRouter;
