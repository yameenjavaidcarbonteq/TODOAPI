const TodoController = require('../controllers/todoController');
const authMiddleware = require("../middlewares/authMiddleware");



function todoRouter(express) {

    const router = express.Router();
    const controller = new TodoController();

    // router.use(authMiddleware);
    
    
    router.post('/',controller.createTodo);
    router.get('/', controller.getTodos);
    router.get('/:id/', controller.getTodoById);
    router.put('/:id/edit', controller.updateTodo);
    router.delete('/:id/delete', controller.deleteTodo);

    return router;
}

module.exports = todoRouter;
