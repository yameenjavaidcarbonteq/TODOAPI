import { logger } from "@infrastructure";
import { 
  GetAllTodosRequestDto, 
  IGetAllTodosResponseDto, 
} from "@application";
import { ITodoProps, ITodoRepo, IUserRepo } from "@domain";
import { TodoRepositoryInstance, UserRepositoryInstance } from "@infrastructure";
import { TodoMapper } from "@infrastructure";
import { ErrorStatusCodes, InvalidTodoData, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";
import {PaginationOptions, PaginationData} from "@application";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

class GetAllTodosUsecase {
  private todoRepo: ITodoRepo;
  private userRepo: IUserRepo;
  
  constructor(userRepo: IUserRepo, todoRepo: ITodoRepo) {
    this.userRepo = userRepo;
    this.todoRepo = todoRepo;
  }

  async execute(getAllTodosDTO: GetAllTodosRequestDto) : Promise<AppResult<IGetAllTodosResponseDto>>{
    
    const userExistsResult = await AppResult.tryFromPromise(this.userRepo.exists({
      userId: getAllTodosDTO.userId
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

    const paginatedOptions = new PaginationOptions(getAllTodosDTO.pageNumber,getAllTodosDTO.pageLimit);
    const query = {
      status: getAllTodosDTO.status,
      description: getAllTodosDTO.description,
      title: getAllTodosDTO.title
    }
    
    const todosResult = await AppResult.tryFromPromise(this.todoRepo.findAll(
      getAllTodosDTO.userId as string,
      paginatedOptions,
      query
    ));

    const countResult = await AppResult.tryFromPromise(this.todoRepo.count());

    
    if(todosResult.isErr() || countResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    const dbTodos = todosResult.unwrap();
    const dbTodosCount = countResult.unwrap();

    
    const domainTodos = TodoMapper.toDomainFromDbBulk(dbTodos);
    
    const paginatedData : PaginationData<ITodoProps> = new PaginationData(paginatedOptions, dbTodosCount);

    domainTodos.forEach(function (dbTodo) {
      paginatedData.addItem(dbTodo.todoProps);
    });
    
    return AppResult.fromResult(Ok<IGetAllTodosResponseDto>(paginatedData.getPaginatedData()));
  }
}

export const GetAllTodosTodoUsecaseInstance = new GetAllTodosUsecase(
  UserRepositoryInstance,
  TodoRepositoryInstance
);