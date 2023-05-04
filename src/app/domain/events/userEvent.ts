import { IUserProps } from "@domain/entities";
import {
  Email,
  Slack
} from "@infrastructure";

const EventEmitter = require("events");
export const userEventsListner = new EventEmitter();

userEventsListner.on("userCreated", (user : IUserProps) => {
  
  new Slack().info({
    "Title": "User created successfully",
    "Username": user.username ?? "",
    "Email": user.email
  }),
  
  new Email(
    user.email, 
    "Registration Successfull", 
    "You have registered successfully")
    .sendMail();
});



userEventsListner.on("userUpdated", (user : IUserProps) => {
  new Slack().info({
    "Title": "User updated successfully",
    "Updated User": 
    {
      "Username": user.username ?? "",
      "Email": user.email
    }
  }),
  
  new Email(
    user.email, 
    "User Updated successfully", 
    "You have updated user successfully")
    .sendMail();
});