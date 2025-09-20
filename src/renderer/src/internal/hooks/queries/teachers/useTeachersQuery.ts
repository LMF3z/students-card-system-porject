import {
  createTeacherApi,
  deleteTeacherApi,
  getTeacherApi,
  getTeachersApi,
  updateTeacherApi
} from '@renderer/api/teachers/teachers.api'
import { useAuthStore } from '@renderer/internal/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  KEY_CREATE_TEACHER,
  KEY_DELETE_TEACHER,
  KEY_GET_TEACHER,
  KEY_GET_TEACHERS,
  KEY_UPDATE_TEACHER
} from '../queries.constants'
import { TeacherI } from '@renderer/internal/interface/teachers/teacher-interface'

export const useGetTeachersQuery = (offset = 0, limit = 20) => {
  return useQuery({
    queryKey: [KEY_GET_TEACHERS, offset],
    queryFn: () => getTeachersApi({ offset, limit })
  })
}

export const useGetTeacherQuery = (id: number) => {
  return useQuery({
    queryKey: [KEY_GET_TEACHER, id],
    queryFn: () => getTeacherApi(id)
  })
}

export const useCreateTeacherMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_CREATE_TEACHER],
    mutationFn: (payload: TeacherI) => {
      return createTeacherApi({ ...payload, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_TEACHERS] })
    }
  })
}

export const useUpdateTeacherMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_UPDATE_TEACHER],
    mutationFn: (data: TeacherI) => {
      return updateTeacherApi({ ...data, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_TEACHERS] })
    },
    retry: false
  })
}

export const useDeleteTeacherMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: [KEY_DELETE_TEACHER],
    mutationFn: (id: number) => {
      return deleteTeacherApi(id)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_TEACHERS] })
    },
    retry: false
  })
}
