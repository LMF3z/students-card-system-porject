import { TeacherI } from '../../interfaces/teachers/teacher-interface'
import { TeacherModel } from '../../models'
import { createPasswordHash } from '../../utils/password.utils'
import { LIMIT } from '../constants'

export class TeachersRepository {
  static async create(newTeacher: TeacherI) {
    const saved = await TeacherModel.create({
      ...newTeacher,
      password: createPasswordHash(newTeacher.password)
    })
    return saved?.dataValues
  }

  static async findOne(id: number) {
    const saved = await TeacherModel.findOne({
      where: {
        id
      },
      attributes: { exclude: ['password'] }
    })

    return saved?.dataValues
  }

  static async getUserByEmail(email: string) {
    try {
      const saved = await TeacherModel.findOne({
        where: {
          email
        }
      })

      return saved?.dataValues
    } catch (error) {
      return null
    }
  }

  static async findAll(params: { offset?: number; limit?: number; userId: number }) {
    const { offset = 0, limit = LIMIT } = params
    const saved = await TeacherModel.findAndCountAll({
      attributes: { exclude: ['password'] },
      offset,
      limit
    })

    return saved
  }

  static async update(id: number, newTeacher: TeacherI) {
    const existing = await TeacherModel.findOne({
      where: { id }
    })
    if (!existing) return null

    const [affected] = await TeacherModel.update(
      { ...newTeacher, password: createPasswordHash(newTeacher.password) },
      {
        where: { id }
      }
    )

    if (affected === 0) return null

    const updated = await TeacherModel.findOne({
      where: { id }
    })

    return updated?.dataValues
  }

  static async delete(id: number) {
    const affected = await TeacherModel.destroy({
      where: {
        id
      }
    })

    return affected > 0
  }
}
