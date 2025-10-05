import { EnrollmentI } from '../../interfaces/enrollment/enrollment.interface'
import { EnrollmentRepository } from '../../repositories/enrollment/enrollment.reposiory'

export const createEnrollmentController = async (payload: EnrollmentI) => {
  const result = await EnrollmentRepository.create(payload)

  if (!result) {
    throw new Error('Error al crear la inscripción')
  }

  return result
}

export const getEnrollmentController = async (id: number) => {
  const result = await EnrollmentRepository.findOne(id)

  if (!result) {
    throw new Error('Inscripción no encontrado')
  }

  return result
}

export const getEnrollmentsController = async (params: {
  offset?: number
  limit?: number
  userId: number
}) => {
  const result = await EnrollmentRepository.findAll(params)
  return { rows: result.rows.map((c) => c.dataValues), count: result.count }
}

export const updateEnrollmentController = async (payload: EnrollmentI) => {
  const result = await EnrollmentRepository.update(payload.id, payload)

  if (!result) {
    throw new Error('Error al actualizar la inscripción o no encontrado')
  }

  return result
}

export const deleteEnrollmentController = async (id: number) => {
  const result = await EnrollmentRepository.delete(id)

  if (!result) {
    throw new Error('Error al eliminar la inscripción o no encontrado')
  }

  return result
}
