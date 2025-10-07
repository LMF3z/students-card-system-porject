import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { createEnrollmentApi, getEnrollmentsApi, deleteEnrollmentApi } from '../../../../api'
// import { useAuthStore } from '../../../store'
import type { EnrollmentI } from '../../../interface'

export const useGetEnrollmentsQuery = (offset = 0, limit = 20) => {
  return useQuery({
    queryKey: ['GET_ENROLLMENTS', offset],
    queryFn: () => getEnrollmentsApi({ offset, limit })
  })
}

export const useCreateEnrollmentMutation = () => {
  const client = useQueryClient()
  // const { isAuth } = useAuthStore()
  // const userId = isAuth?.id

  return useMutation({
    mutationKey: ['CREATE_ENROLLMENT'],
    mutationFn: (payload: EnrollmentI) => {
      return createEnrollmentApi({ ...payload })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['GET_ENROLLMENTS'] })
    }
  })
}

export const useDeleteEnrollmentMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: ['DELETE_ENROLLMENT'],
    mutationFn: (id: number) => {
      return deleteEnrollmentApi(id)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ['GET_ENROLLMENTS'] })
    }
  })
}
