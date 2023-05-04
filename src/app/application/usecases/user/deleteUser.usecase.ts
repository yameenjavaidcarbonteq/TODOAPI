import { IDeleteUserRequestDto, IDeleteUserResponseDto } from "./dtos";
import { IUserRepo } from "@domain";
import { UserRepositoryInstance } from "@infrastructure";

import { UserMapper } from "@infrastructure";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok } from "oxide.ts";
import { ErrorStatusCodes } from "@http/errors/statusCodes";
import { TodoNotFoundError, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";


class DeleteUserUsecase {
  private readonly userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(deleteUserDto: IDeleteUserRequestDto) : Promise<AppResult<IDeleteUserResponseDto>>{
    
    const findResult = await AppResult.tryFromPromise(this.userRepo.findbyId(deleteUserDto.uid));
    
    if(findResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    const dbUser = findResult.unwrap();
    
    if( dbUser === null){
      return AppResult.fromErr( new UserNotFoundError(
        ErrorStatusCodes.NOT_FOUND,
        "User Not Found"));
    }

    const user = UserMapper.toDomainFromDb(dbUser);
    
    const deleteResult = await AppResult.tryFromPromise(this.userRepo.deleteById(user.id));
    
    if(deleteResult.isErr()){
      return AppResult.fromErr( new UserNotFoundError(
        ErrorStatusCodes.NOT_FOUND,
        "User Not Found"));
    }
    
    return AppResult.fromResult(Ok({
      uid: user.id,
    }));
  }
}

export const DeleteUserUsecaseInstance = new DeleteUserUsecase(
  UserRepositoryInstance,
);