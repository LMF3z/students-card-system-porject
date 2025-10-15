import { contextBridge, ipcRenderer } from 'electron'
import {
  CREATE_ENROLLMENT,
  CREATE_ENROLLMENT_RESPONSE,
  CREATE_REPRESENTATIVE,
  CREATE_REPRESENTATIVE_RESPONSE,
  CREATE_SCHOOL_GRADE,
  CREATE_SCHOOL_GRADE_RESPONSE,
  CREATE_STUDENT,
  CREATE_STUDENT_RESPONSE,
  CREATE_TEACHER,
  CREATE_TEACHER_RESPONSE,
  DELETE_ENROLLMENT,
  DELETE_ENROLLMENT_RESPONSE,
  DELETE_REPRESENTATIVE,
  DELETE_REPRESENTATIVE_RESPONSE,
  DELETE_SCHOOL_GRADE,
  DELETE_SCHOOL_GRADE_RESPONSE,
  DELETE_STUDENT,
  DELETE_STUDENT_RESPONSE,
  DELETE_TEACHER,
  DELETE_TEACHER_RESPONSE,
  ERROR_CHANNEL,
  GET_ADMIN_USER,
  GET_ENROLLMENTS,
  GET_ENROLLMENTS_RESPONSE,
  GET_REPRESENTATIVES,
  GET_REPRESENTATIVES_RESPONSE,
  GET_SCHOOL_GRADES,
  GET_SCHOOL_GRADES_RESPONSE,
  GET_STUDENTS,
  GET_STUDENTS_RESPONSE,
  GET_TEACHERS,
  GET_TEACHERS_RESPONSE,
  LOGIN_USER,
  LOGIN_USER_ACCESS,
  REGISTER_ADMIN_USER,
  SUCCESS_CHANNEL,
  UPDATE_ENROLLMENT,
  UPDATE_ENROLLMENT_RESPONSE,
  UPDATE_REPRESENTATIVE,
  UPDATE_REPRESENTATIVE_RESPONSE,
  UPDATE_SCHOOL_GRADE,
  UPDATE_SCHOOL_GRADE_RESPONSE,
  UPDATE_STUDENT,
  UPDATE_STUDENT_RESPONSE,
  UPDATE_TEACHER,
  UPDATE_TEACHER_RESPONSE
} from '../main/ipcHandlers/ipcHandlers.constants'
// import { electronAPI } from '@electron-toolkit/preload'

const api = {}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', {
      ping: () => ipcRenderer.invoke('ping'),
      GET_ADMIN_USER: () => ipcRenderer.invoke(GET_ADMIN_USER),
      REGISTER_ADMIN_USER: (args: any) => {
        return ipcRenderer.send(REGISTER_ADMIN_USER, args)
      },
      LOGIN_USER: (args: any) => {
        return ipcRenderer.send(LOGIN_USER, args)
      },
      loginUserAccess: (): Promise<boolean> => {
        return new Promise((resolve) => {
          ipcRenderer.once(LOGIN_USER_ACCESS, (_, successData) => {
            resolve(successData)
          })
        })
      },

      // * school grades
      CREATE_SCHOOL_GRADE: (payload: any) => {
        return ipcRenderer.send(CREATE_SCHOOL_GRADE, payload)
      },
      CREATE_SCHOOL_GRADE_RESPONSE: () => {
        return new Promise((resolve) => {
          ipcRenderer.once(CREATE_SCHOOL_GRADE_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      GET_SCHOOL_GRADES: (args: any) => {
        return ipcRenderer.send(GET_SCHOOL_GRADES, args)
      },
      GET_SCHOOL_GRADES_RESPONSE: (): Promise<any> => {
        return new Promise((resolve) => {
          ipcRenderer.once(GET_SCHOOL_GRADES_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      // GET_SCHOOL_GRADE: (params: GetSchoolGradeI) => Promise<void>
      UPDATE_SCHOOL_GRADE: (args: any) => {
        return ipcRenderer.send(UPDATE_SCHOOL_GRADE, args)
      },
      UPDATE_SCHOOL_GRADE_RESPONSE: (args: any) => {
        return ipcRenderer.send(UPDATE_SCHOOL_GRADE_RESPONSE, args)
      },
      DELETE_SCHOOL_GRADE: (id: number) => {
        return ipcRenderer.send(DELETE_SCHOOL_GRADE, id)
      },
      DELETE_SCHOOL_GRADE_RESPONSE: (): Promise<void> => {
        return new Promise((resolve) => {
          ipcRenderer.once(DELETE_SCHOOL_GRADE_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },

      // * teachers
      CREATE_TEACHER: (payload: any) => {
        return ipcRenderer.send(CREATE_TEACHER, payload)
      },
      CREATE_TEACHER_RESPONSE: () => {
        return new Promise((resolve) => {
          ipcRenderer.once(CREATE_TEACHER_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      GET_TEACHERS: (args: any) => {
        return ipcRenderer.send(GET_TEACHERS, args)
      },
      GET_TEACHERS_RESPONSE: (): Promise<any> => {
        return new Promise((resolve) => {
          ipcRenderer.once(GET_TEACHERS_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      UPDATE_TEACHER: (args: any) => {
        return ipcRenderer.send(UPDATE_TEACHER, args)
      },
      UPDATE_TEACHER_RESPONSE: (args: any) => {
        return ipcRenderer.send(UPDATE_TEACHER_RESPONSE, args)
      },
      DELETE_TEACHER: (id: number) => {
        return ipcRenderer.send(DELETE_TEACHER, id)
      },
      DELETE_TEACHER_RESPONSE: (): Promise<void> => {
        return new Promise((resolve) => {
          ipcRenderer.once(DELETE_TEACHER_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },

      // * representatives
      CREATE_REPRESENTATIVE: (payload: any) => {
        return ipcRenderer.send(CREATE_REPRESENTATIVE, payload)
      },
      CREATE_REPRESENTATIVE_RESPONSE: () => {
        return new Promise((resolve) => {
          ipcRenderer.once(CREATE_REPRESENTATIVE_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      GET_REPRESENTATIVES: (args: any) => {
        return ipcRenderer.send(GET_REPRESENTATIVES, args)
      },
      GET_REPRESENTATIVES_RESPONSE: (): Promise<any> => {
        return new Promise((resolve) => {
          ipcRenderer.once(GET_REPRESENTATIVES_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      UPDATE_REPRESENTATIVE: (args: any) => {
        return ipcRenderer.send(UPDATE_REPRESENTATIVE, args)
      },
      UPDATE_REPRESENTATIVE_RESPONSE: (args: any) => {
        return ipcRenderer.send(UPDATE_REPRESENTATIVE_RESPONSE, args)
      },
      DELETE_REPRESENTATIVE: (id: number) => {
        return ipcRenderer.send(DELETE_REPRESENTATIVE, id)
      },
      DELETE_REPRESENTATIVE_RESPONSE: (): Promise<void> => {
        return new Promise((resolve) => {
          ipcRenderer.once(DELETE_REPRESENTATIVE_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },

      // * students
      CREATE_STUDENT: (payload: any) => {
        return ipcRenderer.send(CREATE_STUDENT, payload)
      },
      CREATE_STUDENT_RESPONSE: () => {
        return new Promise((resolve) => {
          ipcRenderer.once(CREATE_STUDENT_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      GET_STUDENTS: (args: any) => {
        return ipcRenderer.send(GET_STUDENTS, args)
      },
      GET_STUDENTS_RESPONSE: (): Promise<any> => {
        return new Promise((resolve) => {
          ipcRenderer.once(GET_STUDENTS_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      UPDATE_STUDENT: (args: any) => {
        return ipcRenderer.send(UPDATE_STUDENT, args)
      },
      UPDATE_STUDENT_RESPONSE: (args: any) => {
        return ipcRenderer.send(UPDATE_STUDENT_RESPONSE, args)
      },
      DELETE_STUDENT: (id: number) => {
        return ipcRenderer.send(DELETE_STUDENT, id)
      },
      DELETE_STUDENT_RESPONSE: (): Promise<void> => {
        return new Promise((resolve) => {
          ipcRenderer.once(DELETE_STUDENT_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },

      // * enrollment
      CREATE_ENROLLMENT: (payload: any) => {
        return ipcRenderer.send(CREATE_ENROLLMENT, payload)
      },
      CREATE_ENROLLMENT_RESPONSE: () => {
        return new Promise((resolve) => {
          ipcRenderer.once(CREATE_ENROLLMENT_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      GET_ENROLLMENTS: (args: any) => {
        return ipcRenderer.send(GET_ENROLLMENTS, args)
      },
      GET_ENROLLMENTS_RESPONSE: (): Promise<any> => {
        return new Promise((resolve) => {
          ipcRenderer.once(GET_ENROLLMENTS_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },
      UPDATE_ENROLLMENT: (args: any) => {
        return ipcRenderer.send(UPDATE_ENROLLMENT, args)
      },
      UPDATE_ENROLLMENT_RESPONSE: (args: any) => {
        return ipcRenderer.send(UPDATE_ENROLLMENT_RESPONSE, args)
      },
      DELETE_ENROLLMENT: (id: number) => {
        return ipcRenderer.send(DELETE_ENROLLMENT, id)
      },
      DELETE_ENROLLMENT_RESPONSE: (): Promise<void> => {
        return new Promise((resolve) => {
          ipcRenderer.once(DELETE_ENROLLMENT_RESPONSE, (_, successData) => {
            resolve(successData)
          })
        })
      },

      onSuccessCreate: (callback: (data: any) => void) => {
        ipcRenderer.on(SUCCESS_CHANNEL, (_, successData) => {
          callback(successData)
        })
      },
      onError: (callback: (error: any) => void) => {
        ipcRenderer.on(ERROR_CHANNEL, (_, errorData) => {
          callback(errorData)
        })
      },
      removeErrorListener: () => {
        ipcRenderer.removeAllListeners(SUCCESS_CHANNEL)
        ipcRenderer.removeAllListeners(ERROR_CHANNEL)
      }
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.api = api
}
