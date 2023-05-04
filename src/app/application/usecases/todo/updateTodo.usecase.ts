import { UpdateTodoRequestDto, IUpdateTodoResponseDto } from "@application";
import { ITodoRepo, IUserRepo } from "@domain";
import { TodoRepositoryInstance, UserRepositoryInstance } from "@infrastructure";
import { TodoMapper } from "@infrastructure";
import { Todo } from "@domain";

import { todoEventsListner } from "@domain";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok } from "oxide.ts";
import { ErrorStatusCodes, TodoNotFoundError, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";

class UpdateTodoUsecase {
  private todoRepo: ITodoRepo;
  private userRepo: IUserRepo;
  
  constructor(userRepo: IUserRepo, todoRepo: ITodoRepo) {
    this.userRepo = userRepo;
    this.todoRepo = todoRepo;
  }

  async execute(updateTodoDto: UpdateTodoRequestDto) : Promise<AppResult<IUpdateTodoResponseDto>>{
    
    const userExistsResult = await AppResult.tryFromPromise(this.userRepo.exists({
      userId: updateTodoDto.userId
    }));
    
    if(userExistsResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    const userExists = userExistsResult.unwrap()

    if (!userExists) {
      return AppResult.fromErr( new UserNotFoundError(
          ErrorStatusCodes.NOT_FOUND,
          "User Not Found"));
    }
    
    const todoFindResult = await AppResult.tryFromPromise(this.todoRepo.findbyId(
      updateTodoDto.tid,
      updateTodoDto.userId
    ));
    
    if(todoFindResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    const dbTodo = todoFindResult.unwrap();
    
    const todo : Todo = TodoMapper.toDomainFromDb(dbTodo);
    todo.title = updateTodoDto.title as string;
    todo.description = updateTodoDto.description as string;
    todo.status = updateTodoDto.status as string;

    const updateResult = await AppResult.tryFromPromise(this.todoRepo.updateById(todo.id, todo.todoProps, todo.userId));
    if(updateResult.isErr()){
      return AppResult.fromErr( new TodoNotFoundError(
        ErrorStatusCodes.NOT_FOUND,
        "Todo Not Found"));
    }
    
    todoEventsListner.emit('todoUpdated', todo);

    return AppResult.fromResult(Ok({
      tid: todo.id,
      title: todo.todoProps.title,
      description: todo.todoProps.description,
      status: todo.todoProps.status,
      userId: todo.todoProps.userId as string,
      createdAt: todo.todoProps.createdAt as Date,
      updatedAt: todo.todoProps.updatedAt as Date,
    }));
  }
}

export const UpdateTodoUsecaseInstance = new UpdateTodoUsecase(
  UserRepositoryInstance,
  TodoRepositoryInstance
);