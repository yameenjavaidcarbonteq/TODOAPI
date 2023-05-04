import { PaginationInfo } from "@application";
import { IUserProps } from "@domain";
export interface ICreateUserResponseDto {
    uid: string;
    email: string;
    username: string;
}

export interface IDeleteUserResponseDto {
    uid: string;
}

export interface IUpdateUserResponseDto {
    uid: string;
    email: string;
    username: string;
}

export interface IGetUserByIdResponseDto {
    id: string;
    email: string;
    username: string;
}

export interface IGetAllUsersResponseDto {
    paginationInfo: PaginationInfo;
    data: IUserProps[];
}

export interface IGetUserByEmailResponseDto {
    uid: string;
    email: string;
    username: string;
}

export interface ILoginUserResponseDto {
    uid: string;
    email: string;
    token: string;
}

export interface IRegisterUserResponseDto {
    uid: string;
    email: string;
    token: string;
}
