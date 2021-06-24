const bcryptJs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AppError = require("../Error/AppError")

class Helper {
  bcrypt(password) {
    const salt = bcryptJs.genSaltSync(10);
    return bcryptJs.hashSync(password.toString(), salt);
  }

  verifyPassword(password, hashPassword) {
     try{
      return bcryptJs.compareSync(password,hashPassword)
    
    }catch(err){new AppError(err , 500)}
  }

  jwtSign(data) {
     try{
    return jwt.sign(data, process.env.JWT_SECTRET);
    
    }catch(err){new AppError(err , 500)}
  }

  jwtVerify(token) {
    try{
    return jwt.verify(token, process.env.JWT_SECTRET);
    
    }catch(err){new AppError(err , 500)}
  }

  async authAttempt(data={}, password) {
    try {
      
      const User = require(`${require("app-root-path").path}/app/Models/User`);
      const user = await User.findOne(data).select("+password");
      if (!user || !password) return false;
      return bcryptJs.compareSync(password,user.password)
        ? user
        : false;
    } catch (error) {
      new AppError(error , 500);
    }
  }
}

module.exports = new Helper();


