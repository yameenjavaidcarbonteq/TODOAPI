import { ITodoProps, Todo } from "@domain";
import { PaginationInfo } from "@application";

export interface ICreateTodoResponseDto {
    tid: string;
    title: string;
    description: string;
    userId: string;
}

export interface IDeleteTodoResponseDto {
    tid: string;
}

export interface IUpdateTodoResponseDto {
    tid: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface IGetTodoByIdResponseDto {
    tid: string;
    title: string;
    description: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
}

export interface IGetAllTodosResponseDto {
    paginationInfo: PaginationInfo;
    data: ITodoProps[];
}
