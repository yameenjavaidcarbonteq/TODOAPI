import { IUserProps, IUserRepo, User } from "@domain";
import { GenerateAuthToken, UserRepositoryInstance } from "@infrastructure";
import { ErrorStatusCodes, JWTGenerateError, UnExpextedDatabaseError } from "@http/errors";
import { UserMapper } from "@infrastructure";
import { userEventsListner } from "@domain";


export const loginGoogle = async (_: any,accessToken: string, refreshToken: string, profile: any, done: any) => {
  let userRepo: IUserRepo = UserRepositoryInstance;

  
  try {
    const username : string = profile.displayName;
    const email : string = profile.emails[0].value as string;
    
    
    let dbUser : IUserProps ; 

    try {
      dbUser = await userRepo.findbyEmail(email);
    } catch (error) {
      throw new UnExpextedDatabaseError(
          ErrorStatusCodes.DATABASE_ERROR,
          "Database Error");
    }
    
    if (dbUser) {
      const user = UserMapper.toDomainFromDb(dbUser);
      done(null, user);
    } else {
      
      const user = User.create({
        email: email,
        username: username,
        password: ""
      });
      
      try {
        await userRepo.create(UserMapper.toDbFromDomain(user));
      } catch (error) {
        throw new UnExpextedDatabaseError(
            ErrorStatusCodes.DATABASE_ERROR,
            "Database Error");
      }
      
      userEventsListner.emit('userCreated', user.userProps);
      
      done(null, user.userProps);
    }
  } catch (error) {
    done(error, null);
  }
};
