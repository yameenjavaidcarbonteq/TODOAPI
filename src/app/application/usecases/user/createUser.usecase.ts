import { logger } from "@infrastructure";
import { ICreateUserRequestDto, ICreateUserResponseDto } from "./dtos";
import { IUserRepo } from "@domain";
import { UserRepositoryInstance } from "@infrastructure";

import { User } from "@domain";
import { ErrorStatusCodes, UnExpextedDatabaseError, UserAlreadyExistError, UserNotFoundError } from "@http/errors";

import { UserMapper } from "@infrastructure";

import { userEventsListner } from "@domain";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

class CreateUserUsecase {
  private readonly userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(createUserDto: ICreateUserRequestDto) : Promise<AppResult<ICreateUserResponseDto>>{
    
    const userExistsResult = await AppResult.tryFromPromise(this.userRepo.exists({
      email: createUserDto.email,
    }));
    
    if(userExistsResult.isErr()) {
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    const userExists = userExistsResult.unwrap()

    if (userExists) {
      return AppResult.fromErr( new UserAlreadyExistError(
          ErrorStatusCodes.INTERNAL_SERVER_ERROR,
          "User with same email already exists"));
    }
    
    const user = User.create(createUserDto);
    
    const createResult = await AppResult.tryFromPromise(this.userRepo.create(UserMapper.toDbFromDomain(user)));
    
    if(createResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }
    
    userEventsListner.emit('userCreated', user.userProps);

    return AppResult.fromResult(Ok({
      email: user.userProps.email as string,
      uid: user.id,
      username: user.userProps.username as string,
    }));
  }
}

export const CreateUserUsecaseInstance = new CreateUserUsecase(
  UserRepositoryInstance,
);