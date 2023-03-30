/*

    Independent of frameworks: To make your application independent of a specific framework, 
    you can use an abstraction layer to separate your application logic from the framework-specific 
    code. For example, you can define interfaces for your controllers and services, and then implement 
    them using Express or Koa.

    Testable: To make your application testable, you can use a test-driven development (TDD) approach, 
    where you write tests before writing code. You can also use mocking and stubbing techniques to isolate 
    your business logic from external dependencies such as databases or APIs.

    Independent of UI and database: To make your application independent of the UI and database, you can 
    use a repository pattern to abstract away the database implementation, and an MVC (Model-View-Controller) 
    pattern to separate your business logic from the UI logic.

    Independent of external agency: To make your application independent of external agencies, you can use 
    a service-oriented architecture (SOA) or microservices architecture, where your application is composed 
    of small, independent services that communicate with each other through APIs.

    Shippable from the beginning: To make your application shippable from the beginning, you can use a 
    containerization technology like Docker, and define your infrastructure as code using tools like 
    Terraform or CloudFormation.

    Resilient: To make your application resilient, you can use techniques like circuit breakers, retries, 
    and timeouts to handle failures gracefully. You can also use monitoring and logging tools to detect 
    and debug issues in production.

    Scalable: To make your application scalable, you can design your application to be stateless, so that 
    it can easily handle requests in parallel. You can also use a load balancer and auto-scaling groups 
    to distribute the load across multiple instances of your application.

    Overall, by following these principles, you can design a robust and maintainable Node.js application 
    that is independent of external dependencies, easy to test and deploy, and resilient and scalable in production.

*/