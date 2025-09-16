import { UserModel } from '../../models/user.model.js'
import { type UserI, UserRoles } from '../../interfaces/user/user.interface.js'
import { createPasswordHash } from '../../utils/password.utils.js'

export class UsersRepository {
  static async createUser(user: UserI) {
    try {
      const saved = await UserModel.create({
        ...user,
        password: createPasswordHash(user.password)
      })

      return saved?.dataValues
    } catch (error) {
      return null
    }
  }

  static async getExistUserAdmin() {
    try {
      const saved = await UserModel.findOne({
        where: {
          role: UserRoles.SUPER_ADMIN
        },
        attributes: {
          exclude: ['password']
        }
      })

      return saved?.dataValues
    } catch (error) {
      return null
    }
  }

  static async getUserByEmail(email: string) {
    try {
      const saved = await UserModel.findOne({
        where: {
          email
        }
      })

      return saved?.dataValues
    } catch (error) {
      return null
    }
  }
}
