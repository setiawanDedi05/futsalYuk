const authService = require('../services/AuthService');
const { generateToken } = require('../utils/generateJwtToken');
const jwt = require('jsonwebtoken');
const { removeBearer } = require('../utils/removeBearer');
const SECRET_KEY = process.env.SECRET_KEY;

class AuthController {
  async getUserByEmail(req, res) {
    const { email, password } = req.body;
    const user = await authService.getUserByEmail(email)
    if (user && user.password === password) {
      const token = generateToken(user, process.env.SECRET_KEY, {
        expiresIn: "1h"
      });
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: 'invalid credential' });
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
