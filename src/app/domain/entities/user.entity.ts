import { IUserProps } from "./interface.props";
import { Entity } from "./entity";

export class User extends Entity<IUserProps>
{
    private constructor({uid, ...props}: IUserProps) 
    {
        super(props, uid);
    }
    public static create(userProps: IUserProps) {
        const user = new User(userProps);
        return user;
    }
    get userProps() : IUserProps  {
        return {
            uid: this._id,
            ...this.props,
        };
    }
    get id() {
        return this._id;
    }
    set username(username: string) {
        if (username) {
          this.props.username = username;
        }
    }
    set email(email: string) {
        if (email) {
            this.props.email = email;
        }
    }
    set updatedAt(date: Date) {
        this.props.updatedAt = date;
    }
    set createdAt(date: Date) {
        this.props.createdAt = date;
    }
}
