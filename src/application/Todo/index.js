module.exports = {
    ...require('./TodoService'),
    ...require('./handler'),
    ...require('./todoCommands/createTodoCommand'),
    ...require('./todoCommands/deleteTodoCommand'),
    ...require('./todoCommands/updateTodoCommand'),
    ...require('./todoCommands/getTodoByIDCommand'),
    ...require('./todoCommands/getAllTodosCommand')
}