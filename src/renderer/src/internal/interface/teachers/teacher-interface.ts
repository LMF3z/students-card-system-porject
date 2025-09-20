import { UserRoles } from '../user/user.interface'

export interface TeacherI {
  id: number
  first_name: string
  second_name: string
  first_last_name: string
  second_last_name: string
  dni: string
  address: string
  phone_number: string
  email: string
  password: string
  register_by: number
  role: UserRoles.TEACHER

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}
