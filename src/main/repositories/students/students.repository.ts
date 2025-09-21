import { StudentI } from '../../interfaces/studens/student.interface'
import { StudentModel } from '../../models'
import { LIMIT } from '../constants'

export class StudentsRepository {
  static async create(newTeacher: StudentI) {
    const saved = await StudentModel.create({
      ...newTeacher
    })
    return saved?.dataValues
  }

  static async findOne(id: number) {
    const saved = await StudentModel.findOne({
      where: {
        id
      },
      attributes: { exclude: ['password'] }
    })

    return saved?.dataValues
  }

  static async findAll(params: { offset?: number; limit?: number; userId: number }) {
    const { offset = 0, limit = LIMIT } = params
    const saved = await StudentModel.findAndCountAll({
      offset,
      limit
    })

    return saved
  }

  static async update(id: number, newTeacher: StudentI) {
    const existing = await StudentModel.findOne({
      where: { id }
    })
    if (!existing) return null

    const [affected] = await StudentModel.update(
      { ...newTeacher },
      {
        where: { id }
      }
    )

    if (affected === 0) return null

    const updated = await StudentModel.findOne({
      where: { id }
    })

    return updated?.dataValues
  }

  static async delete(id: number) {
    const affected = await StudentModel.destroy({
      where: {
        id
      }
    })

    return affected > 0
  }
}
