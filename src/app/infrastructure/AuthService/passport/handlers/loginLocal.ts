import { IUserProps, IUserRepo, User } from "@domain";
import { PasswordManager, UserRepositoryInstance } from "@infrastructure";
import { ErrorStatusCodes, InvalidCredentialsError, PasswordDecryptionError, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";
import { UserMapper } from "@infrastructure";

export const loginLocal = async (email: string, password: string, done: any) => {
  let userRepo: IUserRepo = UserRepositoryInstance;
  
  try {
    
    let dbUser : IUserProps ; 

    try {
      dbUser = await userRepo.findbyEmail(email);
    } catch (error) {
      throw new UnExpextedDatabaseError(
          ErrorStatusCodes.DATABASE_ERROR,
          "Database Error");
    }

    if (!dbUser) {
      done(new UserNotFoundError(
          ErrorStatusCodes.NOT_FOUND,
          "Invalid Credentials"));
    }

    
    const user = UserMapper.toDomainFromDb(dbUser);
    let isVerifiedUser = false;

    try {
      isVerifiedUser = await PasswordManager.verifyPassword(
        password,
        user.userProps.password
      );
    } catch (error) {
      done(new PasswordDecryptionError(ErrorStatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error"));
    }

    if (!isVerifiedUser) {
      done(new InvalidCredentialsError(
          ErrorStatusCodes.UNAUTHORIZED,
          "Invalid Credentials" ));
    }

    done(null, user.userProps);
  } catch (error) {
    done(error, null);
  }
};
