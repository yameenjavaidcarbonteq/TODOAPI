Application Services (also called "Workflow Services", "Use Cases", "Interactors", etc.) are used to orchestrate the steps required to fulfill the commands imposed by the client.

Application services:

Typically used to orchestrate how the outside world interacts with your application and performs tasks required by the end users;
Contain no domain-specific business logic;
Operate on scalar types, transforming them into Domain types. A scalar type can be considered any type that's unknown to the Domain Model. This includes primitive types and types that don't belong to the Domain;
Uses ports to declare dependencies on infrastructural services/adapters required to execute domain logic (ports are just interfaces, we will discuss this topic in details below);
Fetch domain Entities/Aggregates (or anything else) from database/external APIs (through ports/interfaces, with concrete implementations injected by the DI library);
Execute domain logic on those Entities/Aggregates (by invoking their methods);
In case of working with multiple Entities/Aggregates, use a Domain Service to orchestrate them;
Execute other out-of-process communications through Ports (like event emits, sending emails, etc.);
Services can be used as a Command/Query handlers;
Should not depend on other application services since it may cause problems (like cyclic dependencies);


In general, the decision to use a domain event or an integration event depends on the scope and purpose of the event.

If the event is related to a change or an action that has occurred within the bounded context or domain of the todo list, then it could be considered a domain event. For example, "todo created" or "todo updated" would be examples of domain events, because they relate to changes within the domain of the todo list.

However, if the event is related to an action that has occurred outside of the domain of the todo list, or it involves coordination with other services or systems, then it could be considered an integration event. For example, "user deleted" would be an integration event, because it involves coordination with a user service or system outside of the todo list domain.

In the case of "tododeleted", it depends on the context of the event. If the event is raised within the domain of the todo list, and it represents a change or an action that has occurred within that domain, then it could be considered a domain event. For example, if "tododeleted" is raised by the Todo aggregate when a todo item is deleted, and it contains data such as the ID of the deleted todo item, the deletion date, and any other relevant details, then it could be considered a domain event.

However, if "tododeleted" is raised by an external component or service, such as a user service, and it involves coordination with other systems or services, then it could be considered an integration event. For example, if "tododeleted" is raised by a user service when a user account is deleted, and it contains data such as the ID of the user, the deletion date, and any other relevant details, then it could be considered an integration event.

In general, the choice between using a domain event or an integration event depends on the context and purpose of the event. Both types of events can be useful in different scenarios, and it's important to choose the appropriate type of event based on the specific requirements of the system.


Ports
Ports are interfaces that define contracts that should be implemented by adapters. For example, a port can abstract technology details (like what type of database is used to retrieve some data), and infrastructure layer can implement an adapter in order to execute some action more related to technology details rather than business logic. Ports act like abstractions for technology details that business logic does not care about. Name "port" most actively is used in Hexagonal Architecture.


In Application Core dependencies point inwards. 
Outer layers can depend on inner layers, but inner layers never depend on outer layers. 
Application Core shouldn't depend on frameworks or access external resources directly. 
Any external calls to out-of-process resources/retrieval of data from remote processes should be done through ports (interfaces), with class implementations created somewhere in infrastructure layer and injected into application's core (Dependency Injection and Dependency Inversion). 
This makes business logic independent of technology, facilitates testing, allows to plug/unplug/swap any external resources easily making application modular and loosely coupled.

Ports are basically just interfaces that define what has to be done and don't care about how it's done.
Ports can be created to abstract side effects like I/O operations and database access, technology details, invasive libraries, legacy code etc. from the Domain.
By abstracting side effects, you can test your application logic in isolation by mocking the implementation. This can be useful for unit testing.
Ports should be created to fit the Domain needs, not simply mimic the tools APIs.
Mock implementations can be passed to ports while testing. Mocking makes your tests faster and independent of the environment.
Abstraction provided by ports can be used to inject different implementations to a port if needed (polymorphism).
When designing ports, remember the Interface segregation principle. Split large interfaces into smaller ones when it makes sense, but also keep in mind to not overdo it when not necessary.
Ports can also help to delay decisions. The Domain layer can be implemented even before deciding what technologies (frameworks, databases etc.) will be used.