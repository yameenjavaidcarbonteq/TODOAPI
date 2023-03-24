


module.exports = {
  ...require('./createTodoCommand'),
  ...require('./deleteTodoCommand'),
  ...require('./updateTodoCommand'),
  ...require('./getTodoByIDCommand'),
  ...require('./getAllTodosCommand')
};