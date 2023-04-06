const Email = require('../../infrastructure/social/email');
const Slack = require('../../infrastructure/social/slack');

const EventEmitter = require("events");
const userEventsListner = new EventEmitter();

userEventsListner.on("userCreated", (user) => {
  
  new Slack().info({
    "Title": "User created successfully",
    "Username": user.username,
    "Email": user.email
  }),
  
  new Email(
    user.email, 
    "Registration Successfull", 
    "You have registered successfully")
    .sendMail();
});



userEventsListner.on("userUpdated", (user) => {
  
  new Slack().info({
    "Title": "User updated successfully",
    "Updated User": 
    {
      "Username": user.username,
      "Email": user.email
    }
  }),
  
  new Email(
    user.email, 
    "User Updated successfully", 
    "You have updated user successfully")
    .sendMail();
});

module.exports = userEventsListner;