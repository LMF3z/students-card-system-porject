import { SchoolGradesI } from '../../interfaces/grades/grades.interface'
import { GradesModel } from '../../models'
import { LIMIT } from '../constants'

export class SchoolGradesRepository {
  static async create(newGrade: SchoolGradesI) {
    try {
      const saved = await GradesModel.create(newGrade)

      return saved?.dataValues
    } catch (error) {
      return null
    }
  }

  static async findOne(id: number, userId: number) {
    try {
      const saved = await GradesModel.findOne({
        where: {
          id,
          register_by: userId
        }
      })

      return saved?.dataValues
    } catch (error) {
      return null
    }
  }

  static async findAll(params: { offset?: number; limit?: number; userId: number }) {
    try {
      const { offset = 0, limit = LIMIT, userId } = params
      const saved = await GradesModel.findAll({
        where: {
          register_by: userId
        },
        offset,
        limit
      })

      return saved.map((grade) => grade.dataValues)
    } catch (error) {
      return []
    }
  }

  static async update(id: number, newGrade: Partial<SchoolGradesI>, userId: number) {
    try {
      const existing = await GradesModel.findOne({
        where: { id, register_by: userId }
      })
      if (!existing) return null

      const [affected] = await GradesModel.update(newGrade, {
        where: { id, register_by: userId }
      })

      if (affected === 0) return null

      const updated = await GradesModel.findOne({
        where: { id, register_by: userId }
      })

      return updated?.dataValues
    } catch (error) {
      return null
    }
  }

  static async delete(id: number, userId: number) {
    try {
      const affected = await GradesModel.destroy({
        where: {
          id,
          register_by: userId
        }
      })

      return affected > 0
    } catch (error) {
      return false
    }
  }
}
