import { SchoolGradesI } from '../../interfaces/grades/grades.interface'
import { GradesModel } from '../../models'
import { LIMIT } from '../constants'

export class SchoolGradesRepository {
  static async create(newGrade: SchoolGradesI) {
    const saved = await GradesModel.create(newGrade)
    return saved?.dataValues
  }

  static async findOne(id: number, userId: number) {
    const saved = await GradesModel.findOne({
      where: {
        id,
        register_by: userId
      }
    })

    return saved?.dataValues
  }

  static async findAll(params: { offset?: number; limit?: number; userId: number }) {
    const { offset = 0, limit = LIMIT } = params
    const saved = await GradesModel.findAndCountAll({
      offset,
      limit
    })

    return saved
  }

  static async update(id: number, newGrade: SchoolGradesI) {
    const existing = await GradesModel.findOne({
      where: { id }
    })
    if (!existing) return null

    const [affected] = await GradesModel.update(newGrade, {
      where: { id }
    })

    if (affected === 0) return null

    const updated = await GradesModel.findOne({
      where: { id }
    })

    return updated?.dataValues
  }

  static async delete(id: number) {
    const affected = await GradesModel.destroy({
      where: {
        id
      }
    })

    return affected > 0
  }
}
