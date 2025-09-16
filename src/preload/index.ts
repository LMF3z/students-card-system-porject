import { contextBridge, ipcRenderer } from 'electron'
import {
  ERROR_CHANNEL,
  GET_ADMIN_USER,
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
