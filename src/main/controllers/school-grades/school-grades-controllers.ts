import { SchoolGradesI } from '../../interfaces/grades/grades.interface'
import { SchoolGradesRepository } from '../../repositories/school-grades/school-grades-repository'

export const createSchoolGradeController = async (payload: SchoolGradesI) => {
  const { grade_title, grade_section } = payload

  if (!grade_title || !grade_section) {
    throw new Error('Título y sección de la calificación son requeridos')
  }

  const newGrade: SchoolGradesI = payload

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
  return { rows: result.rows.map((c) => c.dataValues), count: result.count }
}

export const updateSchoolGradeController = async (payload: SchoolGradesI) => {
  const { id, grade_title, grade_section } = payload

  if (
    (grade_title !== undefined && !grade_title) ||
    (grade_section !== undefined && !grade_section)
  ) {
    throw new Error('Título y sección de la calificación no pueden estar vacíos')
  }

  const result = await SchoolGradesRepository.update(id, payload)

  if (!result) {
    throw new Error('Error al actualizar la calificación o no encontrada')
  }

  return result
}

export const deleteSchoolGradeController = async (id: number) => {
  const result = await SchoolGradesRepository.delete(id)

  if (!result) {
    throw new Error('Error al eliminar la calificación o no encontrada')
  }

  return result
}
