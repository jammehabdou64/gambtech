const App = require("./Application");
const helper = require("./Helpers/Helper");
const Request = require("./Request/Request");
const protected = require("./Routes/protect")
const commandArg = require("./jcc/getCommands")
const asyncHandler = require("./Error/asyncHandler")
const path = require("path")

class Gambtech extends App {
  ApiController(fileName) {
    const rootPath = require("app-root-path").path;
    return require(path.resolve(`${rootPath}/app/Controllers/Api/${fileName}`));
  }

  AdminController(fileName) {
    const rootPath = require("app-root-path").path;
    return require(path.resolve(`${rootPath}/app/Controllers/Admin/${fileName}`));
  }

  getModel(fileName) {
    const rootPath = require("app-root-path").path;
    return require(path.resolve(`${rootPath}/app/Models/${fileName}`));
  }
  getMiddleware(fileName) {
    const rootPath = require("app-root-path").path;
    return require(path.resolve(`${rootPath}/app/Middlewares/${fileName}`));
  }
  commandLineArg(command)
  {
   return commandArg(command)
  }
}

const app = new Gambtech();
module.exports = {
  server: app.server(),
  AdminRoute: app.AdminRoutes(),
  ApiRoute: app.ApiRoutes(),
  ApiController: app.ApiController,
  AdminController: app.AdminController,
  getModel: app.getModel,
  getMiddleware: app.getMiddleware,
  bcrypt: helper.bcrypt,
  verifyHash: helper.verfiyPassword,
  jwtSign: helper.jwtSign,
  jwtVerify: helper.jwtVerify,
  protected,
  asyncHandler,
  Request,
  commandLineArg:app.commandLineArg,
  Auth:helper.authAttempt
};
