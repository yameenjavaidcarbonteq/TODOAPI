
import { ITodoRepo, IUserRepo } from "@domain";
import { TodoRepositoryInstance, UserRepositoryInstance } from "@infrastructure";
import { TodoMapper } from "@infrastructure";

import { Todo } from "@domain";
import { ErrorStatusCodes, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";
import { CreateTodoRequestDto, ICreateTodoResponseDto } from "@application";



class CreateTodoUsecase {
  
  private userRepo: IUserRepo;
  private todoRepo: ITodoRepo;
  
  
  constructor(userRepo: IUserRepo, todoRepo: ITodoRepo) {
    this.userRepo = userRepo;
    this.todoRepo = todoRepo;
  }

  async execute(createTodoDto: CreateTodoRequestDto) : Promise<AppResult<ICreateTodoResponseDto>>{
   
    const userExistsResult = await AppResult.tryFromPromise(this.userRepo.exists({
      userId: createTodoDto.userId
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

    
    const todo = Todo.create(createTodoDto);
    
    const createResult = await AppResult.tryFromPromise(this.todoRepo.create(TodoMapper.toDbfromDomain(todo)));
    
    if(createResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    return AppResult.fromResult(Ok<ICreateTodoResponseDto>({
      tid: todo.todoProps.tid,
      title: todo.todoProps.title,
      description: todo.todoProps.description,
      userId: todo.todoProps.userId as string,
    }));

  }
}

export const CreateTodoUsecaseInstance = new CreateTodoUsecase(
  UserRepositoryInstance,
  TodoRepositoryInstance
);