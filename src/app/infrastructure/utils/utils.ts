import bcrypt from "bcrypt";

export function exclude<User, Key extends keyof User>(user: User, keys: Key[] ): Omit<User, Key> {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

export class PasswordManager {
  public static encryptPassword = async (
    plainPassword: string
  ): Promise<string> => {
    return await bcrypt.hash(plainPassword, 10);
  };

  public static verifyPassword = async (
    plainPassword: string,
    passwordedPassword: string
  ): Promise<boolean> => {
    return await bcrypt.compare(plainPassword, passwordedPassword);
  };
}