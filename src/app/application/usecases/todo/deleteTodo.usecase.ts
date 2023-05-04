import { DeleteTodoRequestDto, IDeleteTodoResponseDto } from "@application";
import { ITodoRepo, IUserRepo} from "@domain";
import { TodoRepositoryInstance, UserRepositoryInstance } from "@infrastructure";
import { TodoMapper } from "@infrastructure";
import { Todo } from "@domain";
import { 
  ErrorStatusCodes, 
  TodoNotFoundError, 
  UnExpextedDatabaseError, 
  UserNotFoundError
} from "@http/errors";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

class DeleteTodoUsecase {
  private todoRepo: ITodoRepo;
  private userRepo: IUserRepo;
  
  constructor(userRepo: IUserRepo, todoRepo: ITodoRepo) {
    this.userRepo = userRepo;
    this.todoRepo = todoRepo;
  }

  async execute(deleteTodoDto: DeleteTodoRequestDto) : Promise<AppResult<IDeleteTodoResponseDto>>{
    
    
    const userExistsResult = await AppResult.tryFromPromise(this.userRepo.exists({
      userId: deleteTodoDto.userId
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
      deleteTodoDto.tid,
      deleteTodoDto.userId
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
  
    const deleteResult = await AppResult.tryFromPromise(this.todoRepo.deleteById(
      deleteTodoDto.tid, deleteTodoDto.userId 
    ));
    
    if(deleteResult.isErr()){
      return AppResult.fromErr( new TodoNotFoundError(
        ErrorStatusCodes.NOT_FOUND,
        "Todo Not Found"));
    }
    
    return AppResult.fromResult(Ok<IDeleteTodoResponseDto>({
      tid: todo.id
    }));

  }
}

export const DeleteTodoUsecaseInstance = new DeleteTodoUsecase(
  UserRepositoryInstance,
  TodoRepositoryInstance
);