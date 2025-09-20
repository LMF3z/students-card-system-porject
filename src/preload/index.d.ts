import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      ping: () => void
      GET_ADMIN_USER: () => Promise<boolean>
      REGISTER_ADMIN_USER: (newUserAdmin: CreateUserI) => Promise<void>
      LOGIN_USER: (auth: LoginI) => Promise<void>
      loginUserAccess: () => Promise<UserI | null>

      CREATE_SCHOOL_GRADE: (payload: CreateSchoolGradeI) => Promise<void>
      CREATE_SCHOOL_GRADE_RESPONSE: () => Promise<SchoolGradesI>
      GET_SCHOOL_GRADES: (params: { offset?: number; limit?: number }) => Promise<void>
      GET_SCHOOL_GRADES_RESPONSE: () => Promise<{ rows: GetSchoolGradeI[]; count: number }>
      GET_SCHOOL_GRADE: (params: GetSchoolGradeI) => Promise<void>
      UPDATE_SCHOOL_GRADE: (params: UpdateSchoolGradeI) => Promise<void>
      UPDATE_SCHOOL_GRADE_RESPONSE: () => Promise<void>
      DELETE_SCHOOL_GRADE: (id: number) => Promise<void>
      DELETE_SCHOOL_GRADE_RESPONSE: () => Promise<void>

      onSuccessCreate: (callback: (data: T) => void) => T
      onError: (callback: (error: any) => void) => void
      removeErrorListener: () => void
    }
  }
}
