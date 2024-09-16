const Email = require('../../infrastructure/social/email');
const Slack = require('../../infrastructure/social/slack');

const EventEmitter = require("events");
const todoEventsListner = new EventEmitter();

todoEventsListner.on("todoCreated", (todo) => {
  
  new Slack().info({
    "Title": "Todo created successfully",
    "Todo": 
    {
      "Todo Title": todo.title,
      "Todo Description": todo.description,
      "Todo Status": todo.status,
    }
  }),
  
  new Email(
    todo.email, 
    "Todo Created", 
    "You have created Todo successfully")
    .sendMail();
});



todoEventsListner.on("todoUpdated", (todo) => {
  
  new Slack().info({
    "Title": "Todo updated successfully",
    "Updated Todo": 
    {
      "Todo Title": todo.title,
      "Todo Description": todo.description,
      "Todo Status": todo.status,
    }
  }),
  
  new Email(
    todo.email, 
    "Todo Updated successfully", 
    "You have updated todo successfully")
    .sendMail();
});

module.exports = todoEventsListner;