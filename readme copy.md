Useful configurations & scripts
Cold reloading
Cold reloading is nice for local development. In order to do this, we'll need to rely on a couple more packages: ts-node for running TypeScript code directly without having to wait for it be compiled, and nodemon, to watch for changes to our code and automatically restart when a file is changed.


By running npm run start:dev, npx nodemon will start our app using npx ts-node ./src/index.ts, watching for changes to .ts and .js files from within /src.


Creating production builds
In order to clean and compile the project for production, we can add a build script.

Install rimraf, a cross-platform tool that acts like the rm -rf command (just obliterates whatever you tell it to).


Scripts

npm run start:dev
Starts the application in development using nodemon and ts-node to do hot reloading.

npm run start
Starts the app in production by first building the project with npm run build, and then executing the compiled JavaScript at build/index.js.

npm run build
Builds the app at build, cleaning the folder first.




Links:
    https://khalilstemmler.com/blogs/typescript/node-starter-project/
    https://github.com/stemmlerjs/simple-typescript-starter