import { GenerateAuthToken } from "@infrastructure"
import { IRegisterUserRequestDto, IRegisterUserResponseDto } from "./dtos";
import { IUserRepo } from "@domain";
import { UserRepositoryInstance } from "@infrastructure";
import { PasswordManager } from "@infrastructure";
import { UserMapper } from "@infrastructure";

import { AppResult, AppError } from "@carbonteq/hexapp";
import { Ok, Err } from "oxide.ts";

import {
  InvalidUserDataError,
  JWTGenerateError,
  UserAlreadyExistError,
  UnExpextedDatabaseError,
  PasswordEncryptionError
} from "@http";

import { ErrorStatusCodes } from "@http";

import { User } from "@domain";

import { userEventsListner } from "@domain";

class RegisterUserUsecase {
  private readonly userRepo: IUserRepo;

  constructor(userRepo: IUserRepo) {
    this.userRepo = userRepo;
  }

  async execute(registerUserDto: IRegisterUserRequestDto) : Promise<AppResult<IRegisterUserResponseDto>>{
    
    const userExistsResult = await AppResult.tryFromPromise(this.userRepo.exists({
      email: registerUserDto.email,
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


    let encryptedPassword = "";
    try {
      encryptedPassword = await PasswordManager.encryptPassword(
        registerUserDto.password
      );
    } catch (error) {
      throw new PasswordEncryptionError(
          ErrorStatusCodes.INTERNAL_SERVER_ERROR,
          "Internal Server Error");
    }

    registerUserDto.password = encryptedPassword;

    const user : User = User.create(registerUserDto);
    
    const createResult = await AppResult.tryFromPromise(this.userRepo.create(UserMapper.toDbFromDomain(user)));
    
    if(createResult.isErr()){
      return AppResult.fromErr( new UnExpextedDatabaseError(
        ErrorStatusCodes.DATABASE_ERROR,
        "Database Error"));
    }

    let token = "";

    try {
      token = GenerateAuthToken.generateToken(user.id);
    } catch (error) {
      throw new JWTGenerateError(
          ErrorStatusCodes.INTERNAL_SERVER_ERROR,
          "Internal Server Error");
    }
    userEventsListner.emit('userCreated', user.userProps);

    return AppResult.fromResult(Ok({
      email: user.userProps.email,
      uid: user.id,
      token: token,
    }));
  }
}

export const RegisterUserUsecaseInstance = new RegisterUserUsecase(
  UserRepositoryInstance,
);