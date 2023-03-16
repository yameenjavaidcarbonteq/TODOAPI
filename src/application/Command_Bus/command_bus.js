// CommandBus.js
export class CommandBus {
  
  constructor() {
    this.handlers = {};
  }
  
  register(commandName, handler) {
    this.handlers[commandName] = handler;
  }

  async execute(command) {
    const handler = this.handlers[command.constructor.name];
    if (!handler) {
      throw new Error(`Handler not found for command ${command.constructor.name}`);
    }

    return await handler.handle(command);
  }
}

