import { IUserProps } from "@domain";
import { PaginationOptions } from "@application";

export interface IUserRepo {
  
  findAll(paginatedOptions : PaginationOptions, query?: IUserProps) : Promise<IUserProps[]>;

  findbyId(userId : string) : Promise<IUserProps> ;
  
  findbyEmail(email : string) : Promise<IUserProps> ;
  
  exists({
        userId,
        email,
        username,
      }: {
        userId?: string;
        username?: string;
        email?: string;
      }): Promise<boolean> ;
  
  create(user: IUserProps) : Promise<IUserProps>;
  
  updateById(userId: string, user: IUserProps) : Promise<IUserProps> ;
  
  deleteById(userId: string) : Promise<boolean> ;

  count() : Promise<number> ;
}