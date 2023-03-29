const passport = require ("passport");
const {
    logger,
    database
} = require("@infrastructure");
const { TodoController } = require ('../controllers');
const { TodoService } = require("../../application");
const { TodoStoreFactory } = require ('../../infrastructure/storeFactory');



function todoRouter(express) {

    const router = express.Router();
    const repository = TodoStoreFactory.getStore(database.dbtype);
    const service = new TodoService(repository);
    // router.use(passport.authenticate("jwt", { session: false }));
    logger.info(`Injecting the repository`);
    const todoController = new TodoController(repository);
    
    router.post('/', todoController.CreateTodo);
    router.get('/', todoController.GetAllTodos);
    router.get('/:id/', todoController.GetTodoById);
    router.put('/:id/edit', todoController.UpdateTodo);
    router.delete('/:id/delete', todoController.DeleteTodo);

    return router;
}

module.exports = {todoRouter};
