import { createStudentApi, deleteStudentApi, getStudentsApi, updateStudentApi } from '@renderer/api'
import { useAuthStore } from '@renderer/internal/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  KEY_CREATE_STUDENT,
  KEY_DELETE_STUDENT,
  KEY_GET_STUDENTS,
  KEY_UPDATE_STUDENT
} from '../queries.constants'
import { StudentI } from '@renderer/internal/interface'

export const useGetStudentsQuery = (offset = 0, limit = 20) => {
  return useQuery({
    queryKey: [KEY_GET_STUDENTS, offset],
    queryFn: () => getStudentsApi({ offset, limit })
  })
}

export const useCreateStudentMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_CREATE_STUDENT],
    mutationFn: (payload: StudentI) => {
      return createStudentApi({ ...payload, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_STUDENTS] })
    }
  })
}

export const useUpdateStudentMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_UPDATE_STUDENT],
    mutationFn: (data: StudentI) => {
      return updateStudentApi({ ...data, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_STUDENTS] })
    },
    retry: false
  })
}

export const useDeleteStudentMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: [KEY_DELETE_STUDENT],
    mutationFn: (id: number) => {
      return deleteStudentApi(id)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_STUDENTS] })
    },
    retry: false
  })
}
