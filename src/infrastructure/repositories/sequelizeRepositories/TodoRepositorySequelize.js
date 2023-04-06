const { TodoRepositoryPort } = require("@domain");
const TodoModelSequelize = require("../../models/sequelizeModels/TodoModelSequelize");

const TodoEntity = require("@domain");
const PaginationData = require("@application");

class TodoRepositorySequelize extends TodoRepositoryPort {
  constructor() {
    super();
    this.todoModel = TodoModelSequelize;
  }

  async findAll(query, paginatedOptions) {
    const todosCount = await this.todoModel.count({ where: query });
    const paginatedData = new PaginationData(paginatedOptions, todosCount);
    const paginatedTodos = await this.todoModel.findAll({
      where: query,
      limit: paginatedOptions.limit(),
      offset: paginatedOptions.offset(),
    });
    paginatedTodos.forEach(function (toDo) {
      paginatedData.addItem(TodoEntity.createFromObject(toDo.dataValues));
    });
    return paginatedData.getPaginatedData();
  }

  async findbyId(id) {
    const todoDoc = await this.todoModel.findByPk(id);
    return TodoEntity.createFromObject(todoDoc.dataValues);
  }

  async create(todo) {
    const todoDoc = await this.todoModel.create(todo);
    return TodoEntity.createFromObject(todoDoc.dataValues);
  }

  async update(todoItem) {
    const [numUpdated, updatedTodo] = await this.todoModel.update(
      todoItem,
      {
        where: { id: todoItem.id },
        returning: true,
      }
    );
    if (numUpdated > 0) {
      return TodoEntity.createFromObject(updatedTodo[0].dataValues);
    }
  }

  async delete(id) {
    return await this.todoModel.destroy({ where: { id } });
  }

  async count() {
    return await this.todoModel.count();
  }
}

module.exports = {
  TodoRepositorySequelize
};
