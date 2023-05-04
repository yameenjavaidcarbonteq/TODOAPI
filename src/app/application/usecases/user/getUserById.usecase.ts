import { IGetUserByIdRequestDto, IGetUserByIdResponseDto } from "./dtos";
import { IUserProps, IUserRepo } from "@domain";
import { UserRepositoryInstance } from "@infrastructure";
import { UserMapper } from "@infrastructure";
import { ErrorStatusCodes, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

class GetUserByIdUsecase {

  private readonly userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(getUserById: IGetUserByIdRequestDto) : Promise<AppResult<IGetUserByIdResponseDto>>{
    const findResult = await AppResult.tryFromPromise(this.userRepo.findbyId(getUserById.uid));
    
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

    return AppResult.fromResult(Ok({
      id: user.id,
      email: user.userProps.email as string,
      username: user.userProps.username as string,
    }));
  }
}


export const GetUserByIdUsecaseInstance = new GetUserByIdUsecase(
  UserRepositoryInstance
);