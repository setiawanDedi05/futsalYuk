const prisma = require("../prisma/clients");

class AuthRepository {
  async create(email, name, password) {
    try {
      const findedEmail = await this.findByEmail(email);
      if (!findedEmail) {
        return await prisma.user.create({
          data: {
            email,
            name,
            password
          }
        })
      }
    } catch (error) {
      const e = new Error(error.message);
      e.name = error.name;
      e.code = 400;
      throw e;
    }
  }

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

  async findBlacklistToken(token) {
    return await prisma.blacklist.findFirst({
      where: {
        token: token
      }
    })
  }
}

module.exports = new AuthRepository();
