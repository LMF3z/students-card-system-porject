import { SchoolGradesI } from '../../interfaces/grades/grades.interface'
import { SchoolGradesRepository } from '../../repositories/school-grades/school-grades-repository'

export const createSchoolGradeController = async (payload: SchoolGradesI & { userId: number }) => {
  const { grade_title, grade_section, userId } = payload

  if (!grade_title || !grade_section) {
    throw new Error('Título y sección de la calificación son requeridos')
  }

  const newGrade: SchoolGradesI = {
    ...payload,
    register_by: userId
  }

  const result = await SchoolGradesRepository.create(newGrade)

  if (!result) {
    throw new Error('Error al crear la calificación')
  }

  return result
}

export const getSchoolGradeController = async (payload: { id: number; userId: number }) => {
  const { id, userId } = payload
  const result = await SchoolGradesRepository.findOne(id, userId)

  if (!result) {
    throw new Error('Calificación no encontrada')
  }

  return result
}

export const getSchoolGradesController = async (params: {
  offset?: number
  limit?: number
  userId: number
}) => {
  const result = await SchoolGradesRepository.findAll(params)

  return result
}

export const updateSchoolGradeController = async (payload: {
  id: number
  data: Partial<SchoolGradesI>
  userId: number
}) => {
  const { id, data, userId } = payload
  const { grade_title, grade_section } = data

  if (
    (grade_title !== undefined && !grade_title) ||
    (grade_section !== undefined && !grade_section)
  ) {
    throw new Error('Título y sección de la calificación no pueden estar vacíos')
  }

  const result = await SchoolGradesRepository.update(id, data, userId)

  if (!result) {
    throw new Error('Error al actualizar la calificación o no encontrada')
  }

  return result
}

export const deleteSchoolGradeController = async (payload: { id: number; userId: number }) => {
  const { id, userId } = payload
  const result = await SchoolGradesRepository.delete(id, userId)

  if (!result) {
    throw new Error('Error al eliminar la calificación o no encontrada')
  }

  return { message: 'Calificación eliminada correctamente' }
}
