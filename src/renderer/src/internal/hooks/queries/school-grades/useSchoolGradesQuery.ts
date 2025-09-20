import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../../store/useAuthStore'
import type { SchoolGradesI } from '../../../interface/grades/grades.interface'
import {
  createSchoolGradeApi,
  getSchoolGradeApi,
  getSchoolGradesApi,
  updateSchoolGradeApi,
  deleteSchoolGradeApi
} from '../../../../api/school-grades/school-grades.api'
import {
  KEY_GET_SCHOOL_GRADE,
  KEY_GET_SCHOOL_GRADES,
  KEY_CREATE_SCHOOL_GRADE,
  KEY_UPDATE_SCHOOL_GRADE,
  KEY_DELETE_SCHOOL_GRADE
} from '../queries.constants'

export const useGetSchoolGradesQuery = (offset = 0, limit = 20) => {
  return useQuery({
    queryKey: [KEY_GET_SCHOOL_GRADES, offset],
    queryFn: () => getSchoolGradesApi({ offset, limit })
  })
}

export const useGetSchoolGradeQuery = (id: number) => {
  return useQuery({
    queryKey: [KEY_GET_SCHOOL_GRADE, id],
    queryFn: () => getSchoolGradeApi(id)
  })
}

export const useCreateSchoolGradeMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_CREATE_SCHOOL_GRADE],
    mutationFn: (payload: SchoolGradesI) => {
      return createSchoolGradeApi({ ...payload, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_SCHOOL_GRADES] })
    }
  })
}

export const useUpdateSchoolGradeMutation = () => {
  const client = useQueryClient()
  const { isAuth } = useAuthStore()
  const userId = isAuth?.id

  return useMutation({
    mutationKey: [KEY_UPDATE_SCHOOL_GRADE],
    mutationFn: (data: SchoolGradesI) => {
      return updateSchoolGradeApi({ ...data, register_by: userId! })
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_SCHOOL_GRADES] })
    },
    retry: false
  })
}

export const useDeleteSchoolGradeMutation = () => {
  const client = useQueryClient()

  return useMutation({
    mutationKey: [KEY_DELETE_SCHOOL_GRADE],
    mutationFn: (id: number) => {
      return deleteSchoolGradeApi(id)
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [KEY_GET_SCHOOL_GRADES] })
    },
    retry: false
  })
}
