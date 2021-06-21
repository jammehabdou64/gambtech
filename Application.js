const express = require("express");
const http = require("http");
const MiddlewareHandler = require("./middlewareHandler/Middleware");
const Routes = require("./Routes/Routes");
const database = require(`${require("app-root-path").path}/database/index`);
const ErrorHandler = require("./Error/ErrorHandler");


class Application {
  constructor() {
    //initializing express
    this.express = express;
    this.app = this.express();
    //run dot env package
    require("dotenv").config();
    //main app middleware class
    new MiddlewareHandler(this.app, express);
    //db

    
  }

  ApiRoutes() {
    return new Routes(this.app, this.express, "/api");
  }

  AdminRoutes() {
    //injecting all routes from routes class
    return new Routes(this.app, this.express, "/api/admin");
  }

  server() {
    const port = process.env.PORT || process.env.NODE_ENV;
    const server = http.Server(this.app);
    const appError = new ErrorHandler(this.app)
    return {
      listen() {
        database();
        appError.handler()
        server.listen(port, () =>
          console.log(`Server running on http://localhost:${port}`)
        );
      },

      server,
    };
  }
}

module.exports = Application;
