class Request {
  constructor(req, res, next) {
    this.req = req;
    this.res = res;
    this.next = next;
  }

  route(name) {
    return this.req.params[name];
  }
  query(name) {
    return this.req.query[name];
  }
}

module.exports = Request;
