/*
In automated testing, a "spy" is a function or object that records information about its interactions with 
the rest of the system. When you create a spy in a testing framework, it replaces the original function or object 
that you want to spy on, allowing you to track when and how it's called during the test run. For example, if 
you're testing a function that makes an HTTP request, you might use a spy to record the parameters that were 
passed to the request function, the URL that was requested, and the response that was received.

On the other hand, a "stub" is a function or object that replaces the original implementation of another function 
or object. Stubs are used to simulate certain behaviors or outcomes that might be difficult or impossible to 
replicate in a test environment. For example, if you're testing a function that depends on a database connection, 
you might use a stub to simulate a successful connection or a connection error, depending on the specific test 
case you're trying to cover.

Mocha is a JavaScript testing framework that provides a simple and flexible way to write tests for your code. 
Sinon is a library that provides a suite of tools for creating spies, stubs, and other test doubles. Chai is 
an assertion library that makes it easy to write clear and concise assertions about the behavior of your code.

When used together, Mocha, Sinon, and Chai provide a powerful testing toolkit that can help you thoroughly test 
your code and catch bugs before they make it to production.
    



*/