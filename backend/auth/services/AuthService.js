const authRepository = require('../repositories/AuthRepository');

class AuthService {
  async getUserByEmail(email) {
    return await authRepository.findByEmail(email);
  }

  async logout(token){
    return await authRepository.registerBlacklistToken(token);
  }

  async getBlacklistToken(token){
    return await authRepository.findBlacklistToken(token)
  }
}

module.exports = new AuthService();
