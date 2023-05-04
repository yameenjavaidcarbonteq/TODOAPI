export interface CreateTodoRequestData {
    title: string;
    description: string;
    status: string;
    userId: string;
}

export interface DeleteTodoRequestData {
    tid: string;
    userId: string;
}

export interface UpdateTodoRequestData {
    tid: string;
    title: string;
    description: string;
    status: string;
    userId: string;
}

export interface GetTodoByIdRequestData {
    tid: string;
    userId: string;
}

export interface GetAllTodosRequestData {
    pageLimit: number;
    pageNumber: number;
    title?: string;
    description?: string;
    status?: string;
    userId: string;
}

