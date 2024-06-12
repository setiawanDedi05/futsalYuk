const authRepository = require('../repositories/AuthRepository');

class AuthService {
  async createUser(email, name, password){
    return await authRepository.create(email, name, password);
  }

  async deleteUser(id){
    return await authRepository.destroy(id);
  }

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
