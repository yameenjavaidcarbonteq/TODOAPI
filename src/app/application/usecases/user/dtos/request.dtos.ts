export interface ICreateUserRequestDto {
    email: string;
    username: string;
    password: string;
}

export interface IDeleteUserRequestDto {
    uid: string;
}

export interface IUpdateUserRequestDto {
    uid: string;
    username?: string;
    email: string;
}

export interface IGetUserByIdRequestDto {
    uid: string;
}

export interface IGetUserByEmailRequestDto {
    email: string;
}

export interface IGetAllUsersRequestDto {
    pageLimit: number;
    pageNumber: number;
}

export interface ILoginUserRequestDto {
    email: string;
    password: string;
}

export interface IRegisterUserRequestDto {
    email: string;
    username?: string;
    password: string;
}