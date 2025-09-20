import { TeacherI } from '../../interfaces/teachers/teacher-interface'
import { TeachersRepository } from '../../repositories/teachers/teachers-repository'

export const createTeacherController = async (payload: TeacherI) => {
  const result = await TeachersRepository.create(payload)

  if (!result) {
    throw new Error('Error al crear el profesor')
  }

  return result
}

export const getTeacherController = async (id: number) => {
  const result = await TeachersRepository.findOne(id)

  if (!result) {
    throw new Error('Profesor no encontrado')
  }

  return result
}

export const getTeachersController = async (params: {
  offset?: number
  limit?: number
  userId: number
}) => {
  const result = await TeachersRepository.findAll(params)
  return { rows: result.rows.map((c) => c.dataValues), count: result.count }
}

export const updateTeacherController = async (payload: TeacherI) => {
  const result = await TeachersRepository.update(payload.id, payload)

  if (!result) {
    throw new Error('Error al actualizar el profesor o no encontrado')
  }

  return result
}

export const deleteTeacherController = async (id: number) => {
  const result = await TeachersRepository.delete(id)

  if (!result) {
    throw new Error('Error al eliminar el profesor o no encontrado')
  }

  return result
}
