const helper =  require("../Helpers/Helper")

const protect = (request, response, next) => {
    let token;
    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      token = request.headers.authorization.split(" ")[1];
    } else if (request.cookies.token) {
      token = request.cookies.token;
    }
  
    if (!token) {
      return response.json({ message: "Not authorize" }).status(403);
    }
    try {
      request.id = helper.jwtVerify(token);
      next();
    } catch (err) {
      return response.json({ message: "Not authorize" }).status(403);
    }
  };

  module.exports = protect