import { logger } from "@infrastructure";
import { GetTodoByIdRequestDto, IGetTodoByIdResponseDto } from "@application";
import { ITodoRepo, IUserRepo } from "@domain";
import { ITodoProps, IUserProps } from "@domain";
import { TodoMapper } from "@infrastructure";
import { TodoRepositoryInstance, UserRepositoryInstance } from "@infrastructure";

import { ErrorStatusCodes, TodoNotFoundError, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

class GetTodoByIdUsecase {
  private todoRepo: ITodoRepo;
  private userRepo: IUserRepo;
  
  constructor(userRepo: IUserRepo, todoRepo: ITodoRepo) {
    this.userRepo = userRepo;
    this.todoRepo = todoRepo;
  }

  async execute(getTodoById: GetTodoByIdRequestDto) : Promise<AppResult<IGetTodoByIdResponseDto>>{
    
    const userExistsResult = await AppResult.tryFromPromise(this.userRepo.exists({
      userId: getTodoById.userId
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
      getTodoById.tid,
      getTodoById.userId
    ));
    
    if(todoFindResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    const dbTodo = todoFindResult.unwrap();
    
    if( dbTodo === null){
      return AppResult.fromErr( new TodoNotFoundError(
        ErrorStatusCodes.NOT_FOUND,
        "Todo Not Found"));
    }

    const todo = TodoMapper.toDomainFromDb(dbTodo);
    
    return AppResult.fromResult(Ok<IGetTodoByIdResponseDto>({
      tid: todo.id,
      title: todo.todoProps.title,
      description: todo.todoProps.description,
      status: todo.todoProps.status,
      userId: todo.todoProps.userId as string,
      createdAt: todo.todoProps.createdAt as Date,
      updatedAt: todo.todoProps.updatedAt as Date,
    } as IGetTodoByIdResponseDto));
  } 
}

export const GetTodoByIdUsecaseInstance = new GetTodoByIdUsecase(
  UserRepositoryInstance,
  TodoRepositoryInstance
);