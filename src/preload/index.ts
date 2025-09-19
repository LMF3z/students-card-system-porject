import { contextBridge, ipcRenderer } from 'electron'
import {
  ERROR_CHANNEL,
  GET_ADMIN_USER,
  GET_SCHOOL_GRADES,
  GET_SCHOOL_GRADES_RESPONSE,
  LOGIN_USER,
  LOGIN_USER_ACCESS,
  REGISTER_ADMIN_USER,
  SUCCESS_CHANNEL
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

      // CREATE_SCHOOL_GRADE: (payload: CreateSchoolGradeI) => Promise<void>
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
      // UPDATE_SCHOOL_GRADE: (params: UpdateSchoolGradeI) => Promise<void>
      // DELETE_SCHOOL_GRADE: (params: DeleteSchoolGradeI) => Promise<void>

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
