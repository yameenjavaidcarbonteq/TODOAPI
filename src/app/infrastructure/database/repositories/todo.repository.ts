import { PrismaClient } from "@prisma/client";

import { 
  PaginationOptions
} from "@application";
import { 
  ITodoRepo,
  ITodoProps 
} from "@domain";

export class TodoRepository implements ITodoRepo {
  private client: PrismaClient;

  constructor() {
    this.client = new PrismaClient();
  }

  public async findAll(userId : string, paginatedOptions : PaginationOptions, query?: any) : Promise<ITodoProps[]> {
    
    const paginatedTodos = await this.client.todo.findMany({
      where: {
        userId: userId,
        ...query
      },
      skip: paginatedOptions.offset(),
      take: paginatedOptions.limit(),
    });
    
    return paginatedTodos as ITodoProps[];
  }
  
  public async findbyId(todoId : string, userId : string) : Promise<ITodoProps> {
    const dbTodo = await this.client.todo.findUnique({
      where: { 
        tid: todoId
      },
    });

    return dbTodo as ITodoProps;
  }

  public async create(todo: ITodoProps) : Promise<ITodoProps>{
    await this.client.todo.create({
      data: {
        ...todo,
        tid: todo.tid as string,
        userId: todo.userId as string,
      },
    });

    return {
      tid: todo.tid as string,
      title: todo.title,
      description: todo.description,
      status: todo.status,
    } as ITodoProps;
  } 

  public async updateById(todoId: string, todo: ITodoProps, userId: string ) : Promise<ITodoProps> {
    const dbTodo = await this.client.todo.update({
      where: {
        tid: todoId
      },
      data: {
        ...todo,
      },
    });

    return dbTodo as ITodoProps;
  }

  public async deleteById(todoId: string, userId: string) : Promise<boolean> {
    await this.client.todo.delete({
      where: { 
        tid: todoId, 
      }
    });

    return true;

  } 
  
  public async count() : Promise<number> {
    return await this.client.todo.count();
  } 

}


export const TodoRepositoryInstance = new TodoRepository();
  
