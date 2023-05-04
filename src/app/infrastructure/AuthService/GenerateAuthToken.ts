import jwt from "jsonwebtoken";
import { application } from "@config";
export abstract class GenerateAuthToken {
  public static generateToken(id: string) {
    const token = jwt.sign({ id: id }, application.jwtsecret, {
      expiresIn: application.jwtexpirationtime,
    });
    return token;
  }
}