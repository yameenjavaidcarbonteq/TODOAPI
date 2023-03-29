const EventEmitter = require("events");
const todoEventsListner = new EventEmitter();

todoEventsListner.on("todoCreated", (todo) => {
  console.log("Event Triggered");
});

todoEventsListner.on("todoIsUpdated", (todo) => {
    console.log("Event Triggered");
});

module.exports = todoEventsListner;