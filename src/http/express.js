const bodyParser = require('body-parser');

function expressConfig(app) {
    
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(
    bodyParser.urlencoded({
      limit: '50mb',
      extended: true,
      parameterLimit: 50000
    })
  );

  app.use((req, res, next) => {
    // Website you wish to allow to connect
    // res.setHeader('Access-Control-Allow-Origin', 'http://some-accepted-origin');
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With, Content-type, Authorization, Cache-control, Pragma'
    );
    // Pass to next layer of middleware
    next();
  });
}

module.exports = expressConfig;


/*
  res.setHeader('Access-Control-Allow-Methods', 
  'GET, POST, OPTIONS, PUT, PATCH, DELETE') is a line of code that sets 
  an HTTP response header named Access-Control-Allow-Methods to indicate 
  the HTTP methods that are allowed for cross-origin resource sharing (CORS).

  CORS is a mechanism that allows web browsers to make cross-origin 
  requests, which are requests that originate from a different domain, 
  port, or protocol than the current web page. CORS is implemented as a 
  set of HTTP headers that are exchanged between the web browser and 
  the server to negotiate which cross-origin requests are allowed.

  The Access-Control-Allow-Methods header is used by the server to 
  indicate which HTTP methods are allowed for cross-origin requests. 
  In this case, the server is allowing the following HTTP methods: 
  GET, POST, OPTIONS, PUT, PATCH, and DELETE.

  By setting this header, the server is indicating to the web browser 
  that it is safe to make cross-origin requests using any of these HTTP methods. 
  Without this header, the web browser may not be able to make certain types of cross-origin requests, which can result in errors or security vulnerabilities.

  It's worth noting that this header is just one of several CORS headers 
  that can be used to configure cross-origin requests. Other headers 
  include Access-Control-Allow-Origin, which specifies which origins are 
  allowed to make cross-origin requests, and Access-Control-Allow-Headers, 
  which specifies which HTTP headers are allowed in cross-origin requests.

  When used together, these headers enable secure cross-origin communication 
  between web applications hosted on different domains, while still maintaining 
  the security and integrity of both applications.
*/