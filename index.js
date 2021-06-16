const App = require("./Application");
const helper = require("./Helpers/Helper");
const Request = require("./Request/Request");

class Gambtech extends App {
  getController(fileName) {
    const rootPath = require("app-root-path").path;
    return require(`${rootPath}/app/Controllers/${fileName}`);
  }

  getModel(fileName) {
    const rootPath = require("app-root-path").path;
    return require(`${rootPath}/app/Models/${fileName}`);
  }
  getMiddleware(fileName) {
    const rootPath = require("app-root-path").path;
    return require(`${rootPath}/app/Middlewares/${fileName}`);
  }
}

const app = new Gambtech();
module.exports = {
  server: app.server(),
  AdminRoute: app.AdminRoutes(),
  ApiRoute: app.ApiRoutes(),
  getController: app.getController,
  getModel: app.getModel,
  getMiddleware: app.getMiddleware,
  bcrypt: helper.bcrypt,
  verifyHash: helper.verfiyPassword,
  jwtSign: helper.jwtSign,
  jwtVerify: helper.jwtVerify,
  Request,
};
