import { Entity } from "./entity";
import { ITodoProps } from "./interface.props";


export class Todo extends Entity<ITodoProps>
{
    
    constructor({ tid, ...props }: ITodoProps)
    {
        super(props, tid);
    }

    public static create(todoProps: ITodoProps) {
        const todo = new Todo(todoProps);
        return todo;
    }

    get todoProps() {
        return {
            tid: this._id,
            ...this.props,
        };
    }

    get id() {
        return this._id;
    }

    get userId() {
        return this.props.userId;
    }

    set title(title: string) {
        this.props.title = title;
    }

    set description(description: string) {
        this.props.description = description;
    }

    set status(status: string) {
        this.props.status = status;
    }
    
    set updatedAt(date: Date) {
        this.props.updatedAt = date;
    }

    set createdAt(date: Date) {
        this.props.createdAt = date;
    }
}




