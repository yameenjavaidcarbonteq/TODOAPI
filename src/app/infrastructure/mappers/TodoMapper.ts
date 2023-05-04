import { ITodoProps } from "@domain";
import { Todo } from "@domain";

export class TodoMapper {
  public static toDomainFromDb(dbUser: ITodoProps) {
    return Todo.create(dbUser);
  }
  public static toDomainFromDbBulk(dbTodos: ITodoProps[]) {
    return dbTodos.map((dbTodo) => TodoMapper.toDomainFromDb(dbTodo));
  }
  public static toDbfromDomain(todo: Todo): ITodoProps {
    return todo.todoProps;
  }
}
