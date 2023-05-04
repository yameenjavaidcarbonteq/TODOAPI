import { PaginationOptions } from "@application";
import { RepositoryResult } from "@carbonteq/hexapp";
import { ITodoProps } from "@domain";
export interface ITodoRepo {
    findAll(userId : string, paginatedOptions : PaginationOptions, query?: any) :Promise<ITodoProps[]>

    findbyId(userId : string, todoId : string) : Promise<ITodoProps> ;
    
    create(todo: ITodoProps) : Promise<ITodoProps> ;
    
    updateById(todoId: string, todo: ITodoProps, userId?: string ) : Promise<ITodoProps> ;
    
    deleteById(todoId: string, userId: string) : Promise<boolean> ;

    count() : Promise<number> ;
}