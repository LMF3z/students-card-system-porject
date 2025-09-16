import { ipcMain } from 'electron'
import {
  ERROR_CHANNEL,
  GET_ADMIN_USER,
  LOGIN_USER,
  LOGIN_USER_ACCESS,
  REGISTER_ADMIN_USER,
  SUCCESS_CHANNEL
} from './ipcHandlers.constants.js'

import {
  getIfExistAdminController,
  loginUserController,
  registerAdminController
} from '../controllers/auth/auth-controller.js'
import { type UserI, type LoginI } from '../interfaces/user/user.interface.js'
import { handleIpcHelper } from '../utils/handleIpcHelper.utils.js'

export const loadIpcHandlers = () => {
  ipcMain.handle(GET_ADMIN_USER, getIfExistAdminController)

  ipcMain.on(REGISTER_ADMIN_USER, (event, newUser: UserI) =>
    handleIpcHelper<UserI>({
      event,
      data: newUser,
      callback: registerAdminController,
      successMsg: 'Usuario creado correctamente'
    })
  )

  ipcMain.on(LOGIN_USER, async (event, auth: LoginI) => {
    try {
      const results = await loginUserController(auth)

      event.sender.send(SUCCESS_CHANNEL, {
        type: SUCCESS_CHANNEL,
        message: 'Inicio exitoso',
        data: results,
        timestamp: new Date().toISOString()
      })
      event.sender.send(LOGIN_USER_ACCESS, results)
    } catch (error: any) {
      event.sender.send(ERROR_CHANNEL, {
        type: ERROR_CHANNEL,
        message: error.message,
        timestamp: new Date().toISOString()
      })
      event.sender.send(LOGIN_USER_ACCESS, null)
    }
  })
}
