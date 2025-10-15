import { RepresentativeI } from '../../interfaces/representatives/representative.interface'
import { RepresentativeModel } from '../../models'
import { LIMIT } from '../constants'

export class RepresentativesRepository {
  static async create(newRepresentative: RepresentativeI) {
    const saved = await RepresentativeModel.create({
      ...newRepresentative
    })
    return saved?.dataValues
  }

  static async findOne(id: number) {
    const saved = await RepresentativeModel.findOne({
      where: {
        id
      }
    })

    return saved?.dataValues
  }

  static async findAll(params: { offset?: number; limit?: number; userId: number }) {
    const { offset = 0, limit = LIMIT } = params
    const saved = await RepresentativeModel.findAndCountAll({
      offset,
      limit
    })

    return saved
  }

  static async update(id: number, newRepresentative: RepresentativeI) {
    const existing = await RepresentativeModel.findOne({
      where: { id }
    })
    if (!existing) return null

    const [affected] = await RepresentativeModel.update(
      { ...newRepresentative },
      {
        where: { id }
      }
    )

    if (affected === 0) return null

    const updated = await RepresentativeModel.findOne({
      where: { id }
    })

    return updated?.dataValues
  }

  static async delete(id: number) {
    const affected = await RepresentativeModel.destroy({
      where: {
        id
      }
    })

    return affected > 0
  }
}
