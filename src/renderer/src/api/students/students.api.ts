import { StudentI } from '@renderer/internal/interface'

export const createStudentApi = (payload: StudentI) => {
  return window.api.CREATE_STUDENT(payload)
}

export const getStudentsApi = (params: { offset?: number; limit?: number }) => {
  return window.api.GET_STUDENTS(params)
}

export const updateStudentApi = (data: StudentI) => {
  return window.api.UPDATE_STUDENT(data)
}

export const deleteStudentApi = (id: number) => {
  return window.api.DELETE_STUDENT(id)
}
