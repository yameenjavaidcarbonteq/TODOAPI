/*
Design and architecture are related concepts, but they refer to different aspects of software development.

Design refers to the process of creating a plan or blueprint for how a software system will be built. 
This includes defining the functionality of the system, the user interface, and the algorithms and data 
structures that will be used to implement it. Design decisions are typically made early in the development 
process and may be revisited as the system evolves.

Architecture, on the other hand, refers to the high-level structure of a software system. This includes 
how the system is organized into components, how those components interact with each other, and how data 
flows between them. Architecture decisions are typically made early in the development process and have a 
significant impact on the overall structure and maintainability of the system.

Clean architecture, Onion architecture, and Domain-Driven Design (DDD) are all approaches to software architecture 
that aim to create flexible, maintainable, and scalable software systems.

Clean architecture is an architecture pattern that emphasizes the separation of concerns and the 
independence of components. 
    It is based on the principles of dependency inversion and single responsibility, 
    It emphasizes the use of interfaces to decouple components.

    Independent of Frameworks. The architecture does not depend on the existence of some library of feature laden software. This allows you to use such frameworks as tools, rather than having to cram your system into their limited constraints.
    Testable. The business rules can be tested without the UI, Database, Web Server, or any other external element.
    Independent of UI. The UI can change easily, without changing the rest of the system. A Web UI could be replaced with a console UI, for example, without changing the business rules.
    Independent of Database. You can swap out Oracle or SQL Server, for Mongo, BigTable, CouchDB, or something else. Your business rules are not bound to the database.
    Independent of any external agency. In fact your business rules simply don’t know anything at all about the outside world.

    The overriding rule that makes this architecture work is The Dependency Rule. 
    This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all 
    about something in an outer circle. 

    Use Cases: 
    We do not expect changes in this layer to affect the entities. We also do not expect this layer to be 
    affected by changes to externalities such as the database, the UI, or any of the common frameworks. 
    This layer is isolated from such concerns.

Onion architecture is a similar architecture pattern that also emphasizes separation of concerns and 
the independence of components. 
    It is based on the principle of inversion of control using dependency injection
    It organizes components into layers, with each layer having a specific responsibility.

    Dependency goes inwards
    Outer Layer depends on the innder layer
    Inner Layer does not know of outer layer
    Inner layers define interfaces. Outer layers implement interfaces
    Direction of coupling is toward the center
    All application core code can be compiled and run separate from infrastructure



An external layer representing the delivery mechanisms and infrastructure;
An internal layer representing the business logic.

Both Ports & Adapters and Onion Architecture share the idea of isolating the application core 
from the infrastructure concerns by writing adapter code so that the infrastructure code does 
not leak into the application core. This makes it easier to replace both the tools and the delivery 
mechanisms used by the application, providing some protection against technology, tooling and vendor lockdown.



DDD, on the other hand, is a broader design approach that emphasizes the importance of the domain model 
in software development. DDD provides a set of concepts and patterns, such as aggregates, entities, 
value objects, and repositories, to help developers create a flexible and maintainable domain model. 
DDD is not tied to any specific architecture pattern, although it can be implemented using a variety 
of architecture patterns, including Clean Architecture and Onion Architecture.

In summary, design and architecture are both important aspects of software development, and approaches like Clean 
architecture, Onion architecture, and Domain-Driven Design can help create flexible, maintainable, and scalable 
software systems.


    Architectures:

    Monolithic architecture
    Microservices architecture
    Service-oriented architecture (SOA)
    Event-driven architecture (EDA)
    Serverless architecture
    Clean Architecture
    Hexagonal Architecture (also known as Ports and Adapters Architecture)
    Onion Architecture
    Designs:

    Model-View-Controller (MVC)
    Model-View-ViewModel (MVVM)
    Model-View-Presenter (MVP)
    Component-based design
    Domain-driven design (DDD)
    Test-driven development (TDD)
    Behavior-driven development (BDD)
    Agile design

Note that this is not an exhaustive list, and there may be other architectures and designs that 
are not included here. Additionally, some of these architectures and designs may overlap or be used 
in conjunction with each other, depending on the specific requirements of a given project.


In Hexagonal Architecture

The hexagonal architecture is based on three principles and techniques:

Explicitly separate User-Side, Business Logic, and Server-Side
Dependencies are going from User-Side and Server-Side to the Business Logic
We isolate the boundaries by using Ports and Adapters


*/