import { EnrollmentI } from '@renderer/internal/interface/enrollment/enrollment.interface'

export const createEnrollmentApi = (payload: EnrollmentI) => {
  return window.api.CREATE_ENROLLMENT(payload)
}

export const getEnrollmentsApi = (params: { offset?: number; limit?: number }) => {
  return window.api.GET_ENROLLMENTS(params)
}

export const deleteEnrollmentApi = (id: number) => {
  return window.api.DELETE_ENROLLMENT(id)
}
