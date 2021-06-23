const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class Helper {
  bcrypt(password) {
    const salt = bcryptJs.genSaltSync(10);
    return bcryptJs.hashSync(password.toString(), salt);
  }

  verfiyPassword(password, hashPassword) {
     try{
    return bcryptJs.compareSync(password, hashPassword);
    
    }catch(err){console.log(err)}
  }

  jwtSign(data) {
     try{
    return jwt.sign(data, process.env.JWT_SECTRET);
    
    }catch(err){console.log(err)}
  }

  jwtVerify(token) {
    try{
    return jwt.verify(token, process.env.JWT_SECTRET);
    
    }catch(err){console.log(err)}
  }

  async authAttempt(data, password) {
    try {
      console.log(password)
      const User = require(`${require("app-root-path").path}/app/Models/User`);
      const user = await User.findOne({data}).select("+password");
      if (!user || !password) return false;

      return this.verfiyPassword(password, user.password)
        ? { user: user }
        : false;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new Helper();

