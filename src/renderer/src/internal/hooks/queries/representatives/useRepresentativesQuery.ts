import {
  createRepresentativeApi,
  getRepresentativesApi,
  updateRepresentativeApi,
  deleteRepresentativeApi
} from '@renderer/api'
import { useAuthStore } from '@renderer/internal/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  KEY_CREATE_REPRESENTATIVE,
  KEY_DELETE_REPRESENTATIVE,
  KEY_GET_REPRESENTATIVES,
  KEY_UPDATE_REPRESENTATIVE
} from '../queries.constants'
import { RepresentativeI } from '@renderer/internal/interface'

export const useGetRepresentativesQuery = (offset = 0, limit = 20) => {
  return useQuery({
    queryKey: [KEY_GET_REPRESENTATIVES, offset],
    queryFn: () => getRepresentativesApi({ offset, limit })
  })
}

export const useCreateRepresentativeMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_CREATE_REPRESENTATIVE],
    mutationFn: (payload: RepresentativeI) => {
      return createRepresentativeApi({ ...payload, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_REPRESENTATIVES] })
    }
  })
}

export const useUpdateRepresentativeMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_UPDATE_REPRESENTATIVE],
    mutationFn: (data: RepresentativeI) => {
      return updateRepresentativeApi({ ...data, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_REPRESENTATIVES] })
    },
    retry: false
  })
}

export const useDeleteRepresentativeMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: [KEY_DELETE_REPRESENTATIVE],
    mutationFn: (id: number) => {
      return deleteRepresentativeApi(id)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_REPRESENTATIVES] })
    },
    retry: false
  })
}
