import { EnrollmentI } from '../../interfaces/enrollment/enrollment.interface'
import { EnrollmentModel } from '../../models'
import { LIMIT } from '../constants'

export class EnrollmentRepository {
  static async create(newEnrollment: EnrollmentI) {
    const saved = await EnrollmentModel.create(newEnrollment)
    return saved?.dataValues
  }

  static async findOne(id: number) {
    const saved = await EnrollmentModel.findOne({
      where: {
        id
      }
    })

    return saved?.dataValues
  }

  static async findAll(params: { offset?: number; limit?: number }) {
    const { offset = 0, limit = LIMIT } = params
    const saved = await EnrollmentModel.findAndCountAll({
      offset,
      limit
    })

    return saved
  }

  static async findAllRegisterById(params: { offset?: number; limit?: number; userId: number }) {
    const { offset = 0, limit = LIMIT, userId } = params
    const saved = await EnrollmentModel.findAndCountAll({
      where: {
        register_by: userId
      },
      offset,
      limit
    })

    return saved
  }

  static async update(id: number, newEnrollment: EnrollmentI) {
    const existing = await EnrollmentModel.findOne({
      where: { id }
    })
    if (!existing) return null

    const [affected] = await EnrollmentModel.update(newEnrollment, {
      where: { id }
    })

    if (affected === 0) return null

    const updated = await EnrollmentModel.findOne({
      where: { id }
    })

    return updated?.dataValues
  }

  static async delete(id: number) {
    const affected = await EnrollmentModel.destroy({
      where: {
        id
      }
    })

    return affected > 0
  }
}
