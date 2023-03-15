const TodoController = require('../controllers/todoController');

const todoRepositoryAdapter = require ('../../Infrastructure_Layer/database/todoadapter');
const config = require ('../../Infrastructure_Layer/config');

const passport = require("passport");

function todoRouter(express) {

    const router = express.Router();
    // load todoController with dependencies
    const todoController = new TodoController(
        new todoRepositoryAdapter(config.dbtype)
    );

    
    // router.use(passport.authenticate("jwt", { session: false }));
    
    router.post('/',todoController.createTodo);
    router.get('/', todoController.getTodos);
    router.get('/:id/', todoController.getTodoById);
    router.put('/:id/edit', todoController.updateTodo);
    router.delete('/:id/delete', todoController.deleteTodo);

    return router;
}

module.exports = todoRouter;
