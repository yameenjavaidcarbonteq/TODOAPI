import { exclude } from "@infrastructure";
import { User, IUserProps } from "@domain";

export class UserMapper {
  public static toDomainFromDb(dbUser: IUserProps) {
    return User.create(dbUser);
  }
  public static toDomainFromDbBulk(dbUsers: IUserProps[]) {
    return dbUsers.map((dbUser) => UserMapper.toDomainFromDb(dbUser));
  }
  public static toDbFromDomain(user: User): IUserProps {
    return user.userProps;
  }
}
