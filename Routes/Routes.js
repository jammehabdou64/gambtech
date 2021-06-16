const path = require("path");
class Routes {
  constructor(app, express, path) {
    this.app = app;
    this.express = express;
    this.path = path;
  }

  get(url, handler) {
    return this.app.get(path.resolve(`${this.path}${url}`), handler);
  }

  post(url, handler) {
    return this.app.post(path.resolve(`${this.path}${url}`), handler);
  }

  patch(url, handler) {
    return this.app.patch(path.resolve(`${this.path}${url}`), handler);
  }

  put(url, handler) {
    return this.app.put(path.resolve(`${this.path}${url}`), handler);
  }

  delete(url, handler) {
    return this.app.delete(path.resolve(`${this.path}${url}`), handler);
  }

  prefix(url, callback) {
    const router = this.express.Router();
    callback(router);
    return this.app.use(path.resolve(`${this.path}${url}`), router);
  }
}

module.exports = Routes;
