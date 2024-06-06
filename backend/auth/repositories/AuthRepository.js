const prisma = require("../prisma/clients");

class AuthRepository {
  async findByEmail(email) {
    return await prisma.user.findFirst({
      where: { email: email }
    });
  }

  async registerBlacklistToken(token) {
    return await prisma.blacklist.create({
      data: {
        token: token
      }
    })
  }

  async findBlacklistToken(token){
    return await prisma.blacklist.findFirst({
      where: {
        token: token
      }
    })
  }
}

module.exports = new AuthRepository();
