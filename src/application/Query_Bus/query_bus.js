// QueryBus.js
export class QueryBus {
  
  constructor() {
    this.handlers = {};
  }
  
  register(queryName, handler) {
    this.handlers[queryName] = handler;
  }

  async execute(query) {
    const handler = this.handlers[query.constructor.name];
    if (!handler) {
      throw new Error(`Handler not found for query ${query.constructor.name}`);
    }
    console.log(query ,"in Query Bus");
    return await handler.handle(query);
  }
}