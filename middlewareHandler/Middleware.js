const appMiddlewares = require(`${
  require("app-root-path").path
}/app/Middlewares/app`);

const appCors = require(`${
  require("app-root-path").path
}/app/Middlewares/cors`);

const GlobalRequestVariable = require("../Global/Request");

class MiddlewareHandler {
  constructor(app, express) {
    app.use(express.json());
    //cors
    appCors(app);
    appMiddlewares.forEach((middleware) => app.use(middleware));
    new GlobalRequestVariable(app);
  }
}

module.exports = MiddlewareHandler;
