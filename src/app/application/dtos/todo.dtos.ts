import {
    BaseDto,
    DtoValidationResult,
} from '@carbonteq/hexapp';
import { z } from 'zod';

import {
    CreateTodoRequestData,
    DeleteTodoRequestData,
    UpdateTodoRequestData,
    GetTodoByIdRequestData,
    GetAllTodosRequestData
} from "./todo.interface";

export class CreateTodoRequestDto extends BaseDto {
    private static readonly schema = z.object({
        title: z.string().trim().min(1),
        description: z.string(),
        status: z.string(),
        userId: z.string().trim().min(1),
      });
    
      readonly title: string;
      readonly description: string;
      readonly status: string;
      readonly userId: string;
    
      constructor(
        title: string,
        description: string,
        status: string,
        userId: string
      ) {
        super();
        this.title = title;
        this.description = description;
        this.status = status;
        this.userId = userId;
      }
  
    static create(data: object): DtoValidationResult<CreateTodoRequestDto> {
      const userRes = BaseDto.validate<CreateTodoRequestData>(CreateTodoRequestDto.schema, data);
  
      return userRes.map(({ title, description, status, userId }) => new CreateTodoRequestDto(title, description, status, userId));
    }
}

export class DeleteTodoRequestDto extends BaseDto {
    private static readonly schema = z.object({
        tid: z.string().trim().min(1),
        userId: z.string().trim().min(1),
    });
    tid: string;
    userId: string;
  
    constructor(
        tid: string,
        userId: string
    ){
        super();
        this.tid = tid;
        this.userId = userId;
    }
  
    static create(data: object): DtoValidationResult<DeleteTodoRequestDto> {
      const userRes = BaseDto.validate<DeleteTodoRequestData>(DeleteTodoRequestDto.schema, data);
  
      return userRes.map(({ tid, userId }) => new DeleteTodoRequestDto(tid, userId));
    }
}

export class UpdateTodoRequestDto extends BaseDto {
    private static readonly schema = z.object({
        tid: z.string().trim().min(1),
        title: z.string().trim().min(1),
        description: z.string().trim().min(1),
        status: z.string().trim().min(1),
        userId: z.string().trim().min(1),
    });
  
    readonly tid: string;
    readonly title?: string;
    readonly description?: string;
    readonly status?: string;
    readonly userId: string;

    constructor(
        tid: string,
        userId: string,
        title?: string,
        description?: string,
        status?: string,
    ) {
        super();
        this.tid = tid;
        this.title = title;
        this.description = description;
        this.status = status;
        this.userId = userId;
    }
  
    static create(data: object): DtoValidationResult<UpdateTodoRequestDto> {
      const userRes = BaseDto.validate<UpdateTodoRequestData>(UpdateTodoRequestDto.schema, data);
  
      return userRes.map(({ tid, title, description, status, userId }) => new UpdateTodoRequestDto(tid, title, description, status, userId));
    }
}

export class GetTodoByIdRequestDto extends BaseDto {
    private static readonly schema = z.object({
        tid: z.string().trim().min(1),
        userId: z.string().trim().min(1),
    });
    tid: string;
    userId: string;
  
    constructor(
        tid: string,
        userId: string
    ){
        super();
        this.tid = tid;
        this.userId = userId;
    }
  
    static create(data: object): DtoValidationResult<GetTodoByIdRequestDto> {
      const userRes = BaseDto.validate<GetTodoByIdRequestData>(GetTodoByIdRequestDto.schema, data);
  
      return userRes.map(({ tid, userId }) => new GetTodoByIdRequestDto(tid, userId));
    }
}

export class GetAllTodosRequestDto extends BaseDto {
    private static readonly schema = z.object({
        pageLimit: z.number().int().positive(),
        pageNumber: z.number().int().min(1),
        title: z.string().optional(),
        description: z.string().optional(),
        status: z.string().optional(),
        userId: z.string(),
      });
    
      readonly pageLimit: number;
      readonly pageNumber: number;
      readonly userId: string;
      readonly title?: string;
      readonly description?: string;
      readonly status?: string;
      
    
      constructor(
        pageLimit: number,
        pageNumber: number,
        userId: string,
        title?: string,
        description?: string,
        status?: string,
        
      ) {
        super();
        this.pageLimit = pageLimit;
        this.pageNumber = pageNumber;
        this.title = title;
        this.description = description;
        this.status = status;
        this.userId = userId;
      }
  
    static create(data: object): DtoValidationResult<GetAllTodosRequestDto> {
        const userRes = BaseDto.validate<GetAllTodosRequestData>(GetAllTodosRequestDto.schema, data);
    
        return userRes.map(({ 
            pageLimit, pageNumber, title, description, status, userId 
        }) => new GetAllTodosRequestDto(pageLimit, pageNumber, userId, title, description, status));
    }
}