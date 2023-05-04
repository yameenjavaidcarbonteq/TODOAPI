import { IUserProps, IUserRepo } from "@domain";
import { UserMapper, UserRepositoryInstance } from "@infrastructure";
import { ErrorStatusCodes, InvalidTodoData, UnExpextedDatabaseError, UserNotFoundError } from "@http/errors";



export const authorization = async (payload: any, done: any) => {
  
  let userRepo: IUserRepo = UserRepositoryInstance;

  try {
    let dbUser : IUserProps ; 

    try {
      dbUser = await userRepo.findbyId(payload.id);
    } catch (error) {
      throw new UnExpextedDatabaseError(
          ErrorStatusCodes.DATABASE_ERROR,
          "Database Error");
    }
    
    if (!dbUser) {
      throw new UserNotFoundError(
          ErrorStatusCodes.NOT_FOUND,
          "Invalid Credentials");
    }
    
    const user = UserMapper.toDomainFromDb(dbUser);
    console.log("Authenticating");
    done(null, user.userProps);
  } catch (error) {
    done(error);
  }
};
