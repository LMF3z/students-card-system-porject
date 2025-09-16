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

      onSuccessCreate: (callback: (data: T) => void) => T
      onError: (callback: (error: any) => void) => void
      removeErrorListener: () => void
    }
  }
}
