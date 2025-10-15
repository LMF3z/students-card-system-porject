import { RepresentativeI } from '@renderer/internal/interface'

export const createRepresentativeApi = (payload: RepresentativeI) => {
  return window.api.CREATE_REPRESENTATIVE(payload)
}

export const getRepresentativesApi = (params: { offset?: number; limit?: number }) => {
  return window.api.GET_REPRESENTATIVES(params)
}

export const updateRepresentativeApi = (data: RepresentativeI) => {
  return window.api.UPDATE_REPRESENTATIVE(data)
}

export const deleteRepresentativeApi = (id: number) => {
  return window.api.DELETE_REPRESENTATIVE(id)
}
