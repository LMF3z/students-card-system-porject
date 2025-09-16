import { type UserI } from '../../interfaces/user/user.interface.js'
import { UsersRepository } from '../users/users-repository.js'

export class AuthRepository {
  static async registerAuth(user: UserI) {
    const exist = await UsersRepository.getExistUserAdmin()

    if (exist) return false

    const saved = await UsersRepository.createUser(user)

    return saved ? true : false
  }
}
