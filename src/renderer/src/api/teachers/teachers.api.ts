import { TeacherI } from '@renderer/internal/interface/teachers/teacher-interface'

export const createTeacherApi = (payload: TeacherI) => {
  return window.api.CREATE_TEACHER(payload)
}

export const getTeachersApi = (params: { offset?: number; limit?: number }) => {
  return window.api.GET_TEACHERS(params)
}

export const getTeacherApi = (id: number) => {
  return window.api.GET_TEACHER(id)
}

export const updateTeacherApi = (data: TeacherI) => {
  return window.api.UPDATE_TEACHER(data)
}

export const deleteTeacherApi = (id: number) => {
  return window.api.DELETE_TEACHER(id)
}
