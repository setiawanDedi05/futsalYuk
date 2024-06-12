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
      throw new Error(error.message);
    }
  }

  async destroy(id) {
    try {
      return await prisma.user.delete({
        where: {
          id
        }
      })
    } catch (error) {
      throw new Error(error.message);
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
