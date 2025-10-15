import { RepresentativeI } from '../../interfaces/representatives/representative.interface'
import { RepresentativesRepository } from '../../repositories/representatives/representatives.repository'

export const createRepresentativeController = async (payload: RepresentativeI) => {
  const result = await RepresentativesRepository.create(payload)

  if (!result) {
    throw new Error('Error al crear el representante')
  }

  return result
}

export const getRepresentativeController = async (id: number) => {
  const result = await RepresentativesRepository.findOne(id)

  if (!result) {
    throw new Error('Representante no encontrado')
  }

  return result
}

export const getRepresentativesController = async (params: {
  offset?: number
  limit?: number
  userId: number
}) => {
  const result = await RepresentativesRepository.findAll(params)
  return { rows: result.rows.map((c) => c.dataValues), count: result.count }
}

export const updateRepresentativeController = async (payload: RepresentativeI) => {
  const result = await RepresentativesRepository.update(payload.id, payload)

  if (!result) {
    throw new Error('Error al actualizar el representante o no encontrado')
  }

  return result
}

export const deleteRepresentativeController = async (id: number) => {
  const result = await RepresentativesRepository.delete(id)

  if (!result) {
    throw new Error('Error al eliminar el representante o no encontrado')
  }

  return result
}
