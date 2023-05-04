import { logger } from "@infrastructure";
import type { NextFunction, Request, Response } from "express";

import {
    CreateTodoUsecaseInstance,
    UpdateTodoUsecaseInstance,
    DeleteTodoUsecaseInstance,
    GetAllTodosTodoUsecaseInstance,
    GetTodoByIdUsecaseInstance
} from "@application"

import {
    CreateTodoRequestDto,
    DeleteTodoRequestDto,
    UpdateTodoRequestDto,
    GetTodoByIdRequestDto,
    GetAllTodosRequestDto
} from "@application"

export class TodoController {
    constructor()
    {
        
    }
    
    public createTodo = async (req: Request, res: Response,  next: NextFunction) => 
    {
        try {
            const dto = CreateTodoRequestDto.create ({
                title: req.body.title,
                description: req.body.description,
                status: String(req.body.status),
                userId: req.params.userId as string,
            }).unwrap();
            
            const result = await CreateTodoUsecaseInstance.execute(dto);
            res?.status(201).json({ success: true, data: result.unwrap() });
        } catch (error) {
            next(error);
        }
    }
    public updateTodo = async (req: Request, res: Response,  next: NextFunction) => {
    
        try {
            const dto = UpdateTodoRequestDto.create ({
                tid: req.params.todoId as string,
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                userId: req.params.userId as string,
                
            }).unwrap();
            const result = await UpdateTodoUsecaseInstance.execute(dto);
            res?.status(200).json({ success: true, data: result.unwrap() });
        } catch (error) {
            next(error);
        }
    }
    public deleteTodo = async (req: Request, res: Response,  next: NextFunction) =>
    {
        try {
            const dto = DeleteTodoRequestDto.create ({
                tid: req.params.todoId as string,
                userId: req.params.userId as string,
            }).unwrap();
            const result = await DeleteTodoUsecaseInstance.execute(dto);
            res.status(200).json({ success: true, data: result.unwrap() });
              
        } catch (error) {
            next(error);
        }
    }

    public getAllTodos = async (req: Request, res: Response,  next: NextFunction) => {
        try {
            const dto = GetAllTodosRequestDto.create ({
                pageNumber: Number(req.body.pageNumber || 1),
                pageLimit: Number(req.body.pageLimit || 10),
                
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                
                userId: req.params.userId as string,
                
            }).unwrap();
            const result = await GetAllTodosTodoUsecaseInstance.execute(dto);
            res.status(200).json({ success: true, data: result.unwrap() });
        } 
        catch (error) {
            next(error);
        }
    }
    public getTodoById = async (req: Request, res: Response,  next: NextFunction) =>
    {
        try 
        {
            const dto = GetTodoByIdRequestDto.create ({
                tid: req.params.todoId as string,
                userId: req.params.userId as string,
            }).unwrap();
            const result = await GetTodoByIdUsecaseInstance.execute(dto);
            res?.status(200).json({ success: true, data: result.unwrap() });
        } 
        catch (error) {
            next(error);
        }
    }
}

