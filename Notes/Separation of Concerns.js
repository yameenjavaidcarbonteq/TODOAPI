/*
    Dependency Inversion and Inversion of Control are two related software design principles that 
    aim to improve the flexibility and maintainability of software systems.

    Dependency Inversion refers to the principle of designing software modules in such a way that 
    high-level modules do not depend on low-level modules. Instead, both depend on abstractions. 
    This means that the details of the implementation can be changed without affecting the higher-level 
    modules. In other words, dependencies are inverted, so that the high-level modules define the 
    abstractions and the low-level modules implement them.

    In this example, MyClass depends on the ILogger interface, not a concrete implementation like 
    ConsoleLogger. This allows for more flexibility and easier testing, as we can easily swap out the 
    logger implementation for a different one that also implements the ILogger interface.

*/
// A simple interface for a logger
{
  class ILogger {
      log(message) {}
  }
  
  // A simple logger that implements the interface
  class ConsoleLogger extends ILogger {
      log(message) {
      console.log(message);
      }
  }
  
  // A class that depends on the ILogger interface
  class MyClass {
      constructor(logger) {
      this.logger = logger;
      }
      
      doSomething() {
      this.logger.log("Doing something...");
      }
  }
  
  // Create a new instance of ConsoleLogger
  const logger = new ConsoleLogger();
  
  // Create a new instance of MyClass and pass in the logger
  const myInstance = new MyClass(logger);
  
  // Call the doSomething method on the instance
  myInstance.doSomething();
}
/*
  Inversion of Control, on the other hand, refers to the principle of inverting the flow of control in 
  a software system. Instead of the application code controlling the flow of execution, the control is 
  delegated to a framework or container. This allows the framework to manage the lifecycle of objects and 
  to inject dependencies into them. Inversion of Control can be achieved through techniques such as 
  dependency injection or service location.
*/

// Inversion of Control using Dependency Injection

// A simple logger class
class Logger {
  log(message) {
    console.log(message);
  }
}

// A class that depends on the logger
class MyClass {
  constructor(logger) {
    this.logger = logger;
  }
  
  doSomething() {
    this.logger.log("Doing something...");
  }
}

// Create a new logger instance
const logger = new Logger();

// Create a new instance of MyClass and pass in the logger
const myInstance = new MyClass(logger);

// Call the doSomething method on the instance

myInstance.doSomething();

/*
    So, in summary, Dependency Inversion is a design principle that aims to reduce dependencies between 
    modules, while Inversion of Control is a technique that allows a framework to control the flow of 
    execution and manage dependencies in a software system. Both principles are related and often used 
    together, as Inversion of Control can help achieve Dependency Inversion by managing dependencies and 
    injecting abstractions into modules.

*/