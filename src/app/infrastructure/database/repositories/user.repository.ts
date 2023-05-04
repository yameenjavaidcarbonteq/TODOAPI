import { PrismaClient } from "@prisma/client";
import { logger } from "@infrastructure"
import { 
  IUserRepo,
  IUserProps
} from "@domain";

import { PaginationOptions } from "@application";

export class UserRepository implements IUserRepo {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async findAll(paginatedOptions : PaginationOptions, query?: IUserProps) : Promise<IUserProps[]> {
    
    
    const paginatedUsers = await this.client.user.findMany({
      where: {
        ...query
      },
      skip: paginatedOptions.offset(),
      take: paginatedOptions.limit(),
    });

    return paginatedUsers as IUserProps[];
  }
  
  public async findbyId(userId : string) : Promise<IUserProps> {
    const dbUser = await this.client.user.findUnique({
      where: { 
        uid: userId 
      },
    });
    
    return dbUser as IUserProps;
  }

  public async findbyEmail(email : string) : Promise<IUserProps> {
    const dbUser = await this.client.user.findUnique({
      where: { 
        email: email },
    });
    
    return dbUser as IUserProps;
  }

  public async exists({
    userId,
    email,
    username,
  }: {
    userId?: string;
    username?: string;
    email?: string;
  }): Promise<boolean> {
    const users = await this.client.user.findMany({
      where: {
        OR: [
          { uid: { equals: userId as string } },
          { email: { equals: email } },
          { username: { equals: username } },
        ],
      },
    });
    
    if (users.length) 
      return true;
    return false;
  }

  public async create(user: Omit<IUserProps, "todos">) : Promise<IUserProps>{
    await this.client.user.create({
      data: {
        ...user,
        uid: user.uid as string,
      },
      
    });
    
    return {
      uid: user.uid as string,
      email: user.email,
      username: user.username,
      password: user.password
    } as IUserProps;
  } 

  public async updateById(userId: string, user: IUserProps) : Promise<IUserProps> {
    const dbUser = await this.client.user.update({
      where: {
        uid: userId,
      },
      data: {
        ...user,
      },
    });
  
    return dbUser as IUserProps;
  }

  public async deleteById(userId: string) : Promise<boolean> {
    await this.client.user.delete({
      where: { 
        uid: userId },
    });

    return true;
  }
  
  public async count() : Promise<number> {
    return await this.client.todo.count();
  }
} 

export const UserRepositoryInstance = new UserRepository();
  
