const UserController = require('../controllers/userController');
const passport = require("passport");
function userRouter(express) {
  
  const router = express.Router();
  const controller = new UserController();

  router.use(passport.authenticate("jwt", { session: false }));
  
    
  // router.route('/:id').get(controller.fetchUserById);
  // router.route('/').get(controller.fetchUsersByProperty);
  
  router.get("/", controller.findUsers);
  router.get("/:id", controller.getUserProfile);
  router.put("/:id", controller.editUserProfile);
  router.delete("/:id", controller.deleteUserProfile)



  return router;
}

module.exports = userRouter;
