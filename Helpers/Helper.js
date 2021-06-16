const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  bcrypt(password) {
    const salt = bcryptJs.genSaltSync(10);
    return bcryptJs.hashSync(password.toString(), salt);
  }

  verfiyPassword(password, hashPassword) {
    return bcryptJs.compareSync(password, hashPassword);
  }

  jwtSign(data) {
    return jwt.sign(data, process.env.JWT_SECTRET);
  }

  jwtVerify(token) {
    return jwt.verify(token, process.env.JWT_SECTRET);
  }

  async authAttempt(data, password) {
    try {
      const User = require(`${require("app-root-path").path}/app/Models/User`);
      const user = await User.findOne(data).select("+password");
      if (!user || !password) return false;

      return this.verfiyPassword(password.toString(), user.password)
        ? { user: user._id }
        : false;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Helper();
