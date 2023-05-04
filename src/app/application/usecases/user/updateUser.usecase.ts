import { logger } from "@infrastructure";
import { IUpdateUserRequestDto, IUpdateUserResponseDto } from "./dtos";
import { IUserProps, IUserRepo } from "@domain";
import { UserRepositoryInstance } from "@infrastructure";

import { UserMapper } from "@infrastructure";

import { User } from "@domain";

import { userEventsListner } from "@domain";

import { ErrorStatusCodes, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

export class UpdateUserUsecase {

  private readonly userRepo: IUserRepo;

  constructor(userRepo : IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(updateUserDto: IUpdateUserRequestDto) : Promise<AppResult<IUpdateUserResponseDto>>{
    
    
    const findResult = await AppResult.tryFromPromise(this.userRepo.findbyId(updateUserDto.uid));
    
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

    if (updateUserDto.hasOwnProperty("username") && updateUserDto.username) {
      user.username = updateUserDto.username;
    }

    if (updateUserDto.hasOwnProperty("email") && updateUserDto.email) {
      user.email = updateUserDto.email;
    }

    
    
    const updateResult = await AppResult.tryFromPromise(this.userRepo.updateById(updateUserDto.uid, user.userProps));
    
    if(updateResult.isErr()){
      return AppResult.fromErr( new UserNotFoundError(
        ErrorStatusCodes.NOT_FOUND,
        "User Not Found"));
    }
    
    userEventsListner.emit('userUpdated', user.userProps);
    
    return AppResult.fromResult(Ok({
      uid: user.id,
      email: user.userProps.email as string,
      username: user.userProps.username as string,
    }));
  }
}

export const UpdateUserUsecaseInstance = new UpdateUserUsecase(
  UserRepositoryInstance
);