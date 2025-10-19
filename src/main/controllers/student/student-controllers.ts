import { StudentI } from '../../interfaces/studens/student.interface'
import { StudentsRepository } from '../../repositories/students/students.repository'

export const createStudentController = async (payload: StudentI) => {
  const result = await StudentsRepository.create(payload)

  if (!result) {
    throw new Error('Error al crear el estudiante')
  }

  return result
}

export const getStudentController = async (id: number) => {
  const result = await StudentsRepository.findOne(id)

  if (!result) {
    throw new Error('Estudiante no encontrado')
  }

  return result
}

export const getStudentsController = async (params: {
  offset?: number
  limit?: number
  userId?: number
}) => {
  const result = params?.userId
    ? await StudentsRepository.findAllRegisterById({ ...params, userId: params.userId! })
    : await StudentsRepository.findAll(params)

  return { rows: result.rows.map((c) => c.dataValues), count: result.count }
}

export const updateStudentController = async (payload: StudentI) => {
  const result = await StudentsRepository.update(payload.id, payload)

  if (!result) {
    throw new Error('Error al actualizar el estudiante o no encontrado')
  }

  return result
}

export const deleteStudentController = async (id: number) => {
  const result = await StudentsRepository.delete(id)

  if (!result) {
    throw new Error('Error al eliminar el estudiante o no encontrado')
  }

  return result
}
