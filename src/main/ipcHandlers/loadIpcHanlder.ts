import { ipcMain } from 'electron'
import {
  ERROR_CHANNEL,
  GET_ADMIN_USER,
  GET_SCHOOL_GRADES_RESPONSE,
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

import {
  createSchoolGradeController,
  getSchoolGradeController,
  getSchoolGradesController,
  updateSchoolGradeController,
  deleteSchoolGradeController
} from '../controllers/school-grades/school-grades-controllers.js'
import {
  CREATE_SCHOOL_GRADE,
  GET_SCHOOL_GRADE,
  GET_SCHOOL_GRADES,
  UPDATE_SCHOOL_GRADE,
  DELETE_SCHOOL_GRADE
} from './ipcHandlers.constants.js'

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

  // grades
  ipcMain.on(CREATE_SCHOOL_GRADE, (event, payload) =>
    handleIpcHelper({
      event,
      data: payload,
      callback: createSchoolGradeController,
      successMsg: 'Grado creado correctamente'
    })
  )
  ipcMain.on(GET_SCHOOL_GRADES, async (event, params) => {
    try {
      const results = await getSchoolGradesController(params)
      event.sender.send(GET_SCHOOL_GRADES_RESPONSE, results)
    } catch (error: any) {
      event.sender.send(ERROR_CHANNEL, {
        type: ERROR_CHANNEL,
        message: error.message,
        timestamp: new Date().toISOString()
      })
      event.sender.send(LOGIN_USER_ACCESS, null)
    }
  })
  ipcMain.on(GET_SCHOOL_GRADE, (event, id) =>
    handleIpcHelper({
      event,
      data: id,
      callback: getSchoolGradeController
    })
  )
  ipcMain.on(UPDATE_SCHOOL_GRADE, (event, payload) =>
    handleIpcHelper({
      event,
      data: payload,
      callback: updateSchoolGradeController,
      successMsg: 'Grado actualizado correctamente'
    })
  )
  ipcMain.on(DELETE_SCHOOL_GRADE, (event, id) =>
    handleIpcHelper({
      event,
      data: id,
      callback: deleteSchoolGradeController,
      successMsg: 'Grado eliminado correctamente'
    })
  )
}
