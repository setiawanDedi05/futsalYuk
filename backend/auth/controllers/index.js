const authService = require('../services/AuthService');
const { generateToken } = require('../utils/generateJwtToken');
const jwt = require('jsonwebtoken');
const { removeBearer } = require('../utils/removeBearer');
const { encryptPassword, checkPassword } = require('../utils/bcrypt');
const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
  async createUser(email, name, password, callback) {
    try {
      const hashPassword = encryptPassword(password);
      const result = await authService.createUser(email, name, hashPassword);
      if (result) {
        callback(null, { success: true, message: "successfully registered" })
      } else {
        callback(null, { success: false, message: "Account Already Exist", errorCode: 400 })
      }
    } catch (error) {
      callback(null, { success: false, message: error.message })
    }
  }

  async deleteUser(email, token, callback) {
    console.log(token, "ini token")
    try {
      const findedUser = await authService.getUserByEmail(email)
      jwt.verify(token?.split(" ")[1], SECRET_KEY, (err, user) => {
        if (err) return callback(null, { success: false, message: err.message })
        if (Date.now() >= user.exp * 1000) {
          return callback(null, { success: false, message: "token expired" })
        }
        if(findedUser.id === user.userId){
          authService.deleteUser(user.userId).then((data) => {
            console.log(data, "ini data")
            return callback(null, { success: true, message: "successfully deleted" })
          }).catch((error) => {
            console.log(error, "ini error")
            return callback(null, { success: false, message: error.message, errorCode: 404 })
          });
        }
        callback(null, { success: false, message: "your token is not yours" })
      });
    } catch (error) {
      callback(null, { success: false, message: error.message })
    }
  }

  async getUserByEmail(req, res) {
    const { email, password } = req.body;
    const user = await authService.getUserByEmail(email)
    if (user && checkPassword(password, user.password)) {
      const token = generateToken(user, process.env.SECRET_KEY, {
        expiresIn: "1h"
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'email/password not match' });
    }
  }

  async verifyToken(req, res) {
    const { authorization } = req.headers;
    try {
      const isBlacklistToken = await authService.getBlacklistToken(authorization)
      jwt.verify(authorization, SECRET_KEY, (err, user) => {
        if (err) return res.json({ valid: false });
        if (isBlacklistToken) return res.json({ valid: false })
        if (Date.now() >= user.exp * 1000) {
          return res.json({ valid: false });
        }
        res.json({ valid: true, user });
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error" })
    }
  }

  async logout(req, res) {
    const { authorization } = req.headers;
    try {
      await authService.logout(removeBearer(authorization))
      res.status(200).json({
        message: "logout successfully"
      })
    } catch (error) {
      res.status(500).json({
        message: "internal server error"
      })
    }
  }
}

module.exports = new AuthController();
