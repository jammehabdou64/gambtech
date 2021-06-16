const Validation = require("../Validation/validation");
class GlobalRequestVariable {
  constructor(app) {
    app.all("*", (req, res, next) => {
      req.validation = (callback) => {
        return callback(new Validation(req, res, next));
      };
      req.checkErrors = (req) => Object.values(req.validationError).length > 0;

      next();
    });
  }
}

module.exports = GlobalRequestVariable;
