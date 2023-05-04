const { logger } = require ("@logger");
import type { NextFunction, Request, Response } from "express";

import {
    CreateUserUsecaseInstance,
    UpdateUserUsecaseInstance,
    DeleteUserUsecaseInstance,
    GetAllUsersUsecaseInstance,
    GetUserByIdUsecaseInstance,
    IRegisterUserRequestDto,
    RegisterUserUsecaseInstance
} from "@application"

import {
    ICreateUserRequestDto,
    IDeleteUserRequestDto,
    IUpdateUserRequestDto,
    IGetUserByIdRequestDto,
    IGetAllUsersRequestDto
} from "@application"

export class UserController {
    public constructor()
    {
       
    }

    public createUser = async (req: Request, res: Response,  next: NextFunction) =>
    {
        try {
            const createUserDto : ICreateUserRequestDto = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            };
            const result = await CreateUserUsecaseInstance.execute(createUserDto);
            res?.status(201).json(result.unwrap());
        } catch (error) {
            next(error);
        }
    }
    public updateUser = async (req: Request, res: Response,  next: NextFunction) => {
    
        try {
            const updateUserDto: IUpdateUserRequestDto = {
                uid: req.params.userId as string,
                email: req.body.email,
                username: req.body.username,
            };
          
            const result = await UpdateUserUsecaseInstance.execute(updateUserDto);
            res?.status(200).json({ success: true, data: result.unwrap() });
        } catch (error) {
            next(error);
        }
    
    }
    public deleteUser = async (req: Request, res: Response,  next: NextFunction) => 
    {
        try {
        
            const deleteUseDto: IDeleteUserRequestDto = {
                uid: req.params.userId as string,
            };
            
            const result = await DeleteUserUsecaseInstance.execute(deleteUseDto);
            res?.status(200).json({ success: true, data: result.unwrap() });
        } catch (error) {
            next(error);
        }
    }
    public getAllUsers = async (req: Request, res: Response,  next: NextFunction) => 
    {
        try {
            const getUsersListDto: IGetAllUsersRequestDto = {
                pageNumber: Number(req.query.pageNumber || 1),
                pageLimit: Number(req.query.pageLimit || 10),
            };
            const result = await GetAllUsersUsecaseInstance.execute(getUsersListDto);
            res?.status(200).json({ success: true, data: result.unwrap() });
        } 
        catch (error) {
            next(error);
        }
    }
    public getUserById = async (req: Request, res: Response,  next: NextFunction) =>
    {
        try {
            const getUserDto: IGetUserByIdRequestDto = {
                uid: req.params.userId as string,
            };
            const result = await GetUserByIdUsecaseInstance.execute(getUserDto);
            res?.status(200).json({ success: true, data: result.unwrap() });
        } 
        catch (error) {
            next(error);
        }
    }
    
    public register = async (req: Request, res: Response,  next: NextFunction) =>
    {
        try {
        
            const registerUserDto : IRegisterUserRequestDto = {
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            };
            const result = await RegisterUserUsecaseInstance.execute(registerUserDto);
            res?.status(201).json({ success: true, data: result.unwrap() });
        } 
        catch (error) {
            next(error);
        }
    }
}
