const TodoRepository = require('../infrastructure/repositories/UserRepository');

class TodoService {
    constructor() {
        this.todoRepository = new TodoRepository();
    }

    async createTodo(todo) {
        return this.todoRepository.create(todo);
    }

    async getTodos() {
        return this.todoRepository.findAll();
    }
    
    async getTodoById(id) {
        return this.todoRepository.findById(id);
    }

    async updateTodo(id, data) {
        const [updated] = await this.todoRepository.update(data, { where: { id } });
        if (!updated) {
            return null;
        }
        const todo = await this.todoRepository.findByPk(id);
        return todo;
    }

    async deleteTodo(id) {
        const todo = await this.todoRepository.findByPk(id);
        if (!todo) {
            return null;
        }
        await todo.destroy();
        return todo;
    }

}

module.exports = TodoService;