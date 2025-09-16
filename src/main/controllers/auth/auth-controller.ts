import { type UserI, type LoginI } from '../../interfaces/user/user.interface.js'
import { UsersRepository } from '../../repositories/users/users-repository.js'
import { signToken } from '../../utils/jwt.utils.js'
import { comparePasswordHash } from '../../utils/password.utils.js'

export const getIfExistAdminController = async () => {
  const exist = await UsersRepository.getExistUserAdmin()
  console.log('exist --------->', exist)
  return exist ? true : false
}

export const registerAdminController = async (newUser: UserI) => {
  const exist = await getIfExistAdminController()

  if (exist) {
    throw new Error('No se puede registrar más usuarios administradores.')
  }

  const result = await UsersRepository.createUser(newUser)
  return result
}

export const loginUserController = async (auth: LoginI) => {
  const user = await UsersRepository.getUserByEmail(auth.email)

  if (!user) {
    throw new Error('Credenciales incorrectas')
  }

  const isValidPassword = comparePasswordHash(auth.password, user.password)

  if (!isValidPassword) {
    throw new Error('Credenciales incorrectas')
  }

  const { password, ...rest } = user

  const token = signToken({
    id: user.id,
    email: user.email,
    role: user.role
  })

  return { ...rest, token }
}
