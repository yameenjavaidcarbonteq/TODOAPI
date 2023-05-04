import { BaseDto, DtoValidationResult } from '@carbonteq/hexapp';
import { z } from 'zod';
export interface ICreateTodoRequestDto {
    title: string;
    description: string;
    status: string;
    userId: string;
}

export interface IDeleteTodoRequestDto {
    tid: string;
    userId: string;
}

export interface IUpdateTodoRequestDto {
    tid: string;
    title: string;
    description: string;
    status: string;
    userId: string;
}

export interface IGetTodoByIdRequestDto {
    tid: string;
    userId: string;
}

export interface IGetAllTodosRequestDto {
    pageLimit: number;
    pageNumber: number;
    title: string;
    description: string;
    status: string;
    userId?: string;
}

