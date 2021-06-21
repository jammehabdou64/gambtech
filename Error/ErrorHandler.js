const AppErorr = require("./AppError");
class ErrorHandler {
  constructor(app) {
    this.app = app;
  }
  errorRoutesHandler() {
    return this.app.all("*", (req, res, next) => {
      next(new AppErorr(`404 page not found`, 404));
    });
  }
  handler() {
    this.errorRoutesHandler();
    return this.app.use(function (err, req, res, next) {
      err.statusCode = err.statusCode || 500;
      err.status = err.statusCode || "err";
      res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    });
  }
}

module.exports = ErrorHandler;
