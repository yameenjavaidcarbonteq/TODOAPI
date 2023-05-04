import { logger } from '@logger';

class BaseError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidUserDataError extends BaseError {}
export class UserAlreadyExistError extends BaseError {}
export class UnExpextedDatabaseError extends BaseError {}
export class JWTGenerateError extends BaseError {}
export class UserNotFoundError extends BaseError {}
export class InvalidTodoData extends BaseError {}
export class TodoNotFoundError extends BaseError {}
export class PasswordEncryptionError extends BaseError {}
export class PasswordDecryptionError extends BaseError {}
export class InvalidCredentialsError extends BaseError {}
export class InternelServerError extends BaseError {}
export class UnAuthorizedError extends BaseError {}

