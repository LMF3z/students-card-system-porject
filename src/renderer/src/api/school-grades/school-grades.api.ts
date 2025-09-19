import { SchoolGradesI } from '@renderer/internal/interface'

export const createSchoolGradeApi = (payload: SchoolGradesI) => {
  return window.api.CREATE_SCHOOL_GRADE(payload)
}

export const getSchoolGradesApi = (params: { offset?: number; limit?: number }) => {
  return window.api.GET_SCHOOL_GRADES(params)
}

export const getSchoolGradeApi = (id: number) => {
  return window.api.GET_SCHOOL_GRADE(id)
}

export const updateSchoolGradeApi = (data: SchoolGradesI) => {
  return window.api.UPDATE_SCHOOL_GRADE(data)
}

export const deleteSchoolGradeApi = (id: number) => {
  return window.api.DELETE_SCHOOL_GRADE(id)
}
