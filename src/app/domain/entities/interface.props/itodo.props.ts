export interface ITodoProps {
    tid?: string;
    title: string;
    description: string;
    status: string;
    userId?: string;
    updatedAt?: Date;
    createdAt?: Date;
}