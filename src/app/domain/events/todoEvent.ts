import { ITodoProps } from "@domain/entities";
import {
  Email,
  Slack
} from "@infrastructure";


const EventEmitter = require("events");

export const todoEventsListner = new EventEmitter();

todoEventsListner.on("todoCreated", (todo : ITodoProps) => {
  
  new Slack().info({
    "Title": "Todo created successfully",
    "Todo": 
    {
      "Todo Title": todo.title,
      "Todo Description": todo.description,
      "Todo Status": todo.status ? "complete" : "incomplete",
    }
  }),
  
  new Email(
    "yameen.javaid@carbonteq.com",
    "Todo Created", 
    "You have created Todo successfully")
    .sendMail();
});



todoEventsListner.on("todoUpdated", (todo : ITodoProps) => {
  
  new Slack().info({
    "Title": "Todo updated successfully",
    "Updated Todo": 
    {
      "Todo Title": todo.title,
      "Todo Description": todo.description,
      "Todo Status": todo.status ? "complete" : "incomplete",
    }
  }),
  
  new Email(
    "yameen.javaid@carbonteq.com", 
    "Todo Updated successfully", 
    "You have updated todo successfully")
    .sendMail();
});
