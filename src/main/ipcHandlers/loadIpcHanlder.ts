import { ipcMain } from 'electron'
import {
  CREATE_SCHOOL_GRADE_RESPONSE,
  CREATE_STUDENT,
  CREATE_STUDENT_RESPONSE,
  CREATE_TEACHER,
  CREATE_TEACHER_RESPONSE,
  DELETE_SCHOOL_GRADE_RESPONSE,
  DELETE_STUDENT,
  DELETE_STUDENT_RESPONSE,
  DELETE_TEACHER,
  DELETE_TEACHER_RESPONSE,
  ERROR_CHANNEL,
  GET_ADMIN_USER,
  GET_SCHOOL_GRADES_RESPONSE,
  GET_STUDENTS,
  GET_STUDENTS_RESPONSE,
  GET_TEACHERS,
  GET_TEACHERS_RESPONSE,
  LOGIN_USER,
  LOGIN_USER_ACCESS,
  REGISTER_ADMIN_USER,
  SUCCESS_CHANNEL,
  UPDATE_SCHOOL_GRADE_RESPONSE,
  UPDATE_STUDENT,
  UPDATE_STUDENT_RESPONSE,
  UPDATE_TEACHER,
  UPDATE_TEACHER_RESPONSE
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
import {
  createTeacherController,
  deleteTeacherController,
  getTeachersController,
  updateTeacherController
} from '../controllers/teacher/teacher-controllers.js'
import {
  createStudentController,
  deleteStudentController,
  getStudentsController,
  updateStudentController
} from '../controllers/student/student-controllers.js'

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
  ipcMain.on(CREATE_SCHOOL_GRADE, async (event, payload) => {
    try {
      const results = await createSchoolGradeController(payload)

      event.sender.send(CREATE_SCHOOL_GRADE_RESPONSE, results)
      event.sender.send(SUCCESS_CHANNEL, {
        type: SUCCESS_CHANNEL,
        message: 'Grado creado correctamente',
        data: results,
        timestamp: new Date().toISOString()
      })
    } catch (error: any) {
      console.log('error CREATE_SCHOOL_GRADE ---->', error)
      event.sender.send(ERROR_CHANNEL, {
        type: ERROR_CHANNEL,
        message: error.message,
        timestamp: new Date().toISOString()
      })
    }
  })
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
    }
  })
  ipcMain.on(GET_SCHOOL_GRADE, (event, id) =>
    handleIpcHelper({
      event,
      data: id,
      callback: getSchoolGradeController
    })
  )
  ipcMain.on(UPDATE_SCHOOL_GRADE, async (event, payload) => {
    await handleIpcHelper({
      event,
      data: payload,
      callback: updateSchoolGradeController,
      successMsg: 'Grado actualizado correctamente'
    })
    event.sender.send(UPDATE_SCHOOL_GRADE_RESPONSE)
  })
  ipcMain.on(DELETE_SCHOOL_GRADE, async (event, id) => {
    await handleIpcHelper({
      event,
      data: id,
      callback: deleteSchoolGradeController,
      successMsg: 'Grado eliminado correctamente'
    })
    event.sender.send(DELETE_SCHOOL_GRADE_RESPONSE)
  })

  // teachers
  ipcMain.on(CREATE_TEACHER, async (event, payload) => {
    await handleIpcHelper({
      event,
      data: payload,
      callback: createTeacherController,
      successMsg: 'Profesor creado correctamente',
      notifier: {
        send: true,
        nameEvent: CREATE_TEACHER_RESPONSE
      }
    })
  })
  ipcMain.on(GET_TEACHERS, async (event, params) => {
    await handleIpcHelper({
      event,
      data: params,
      callback: getTeachersController,
      notifier: {
        send: true,
        nameEvent: GET_TEACHERS_RESPONSE
      }
    })
  })
  ipcMain.on(UPDATE_TEACHER, async (event, payload) => {
    await handleIpcHelper({
      event,
      data: payload,
      callback: updateTeacherController,
      successMsg: 'Profesor actualizado correctamente',
      notifier: {
        send: true,
        nameEvent: UPDATE_TEACHER_RESPONSE
      }
    })
  })
  ipcMain.on(DELETE_TEACHER, async (event, id) => {
    await handleIpcHelper({
      event,
      data: id,
      callback: deleteTeacherController,
      successMsg: 'Profesor eliminado correctamente',
      notifier: {
        send: true,
        nameEvent: DELETE_TEACHER_RESPONSE
      }
    })
  })

  // students
  ipcMain.on(CREATE_STUDENT, async (event, payload) => {
    await handleIpcHelper({
      event,
      data: payload,
      callback: createStudentController,
      successMsg: 'Estudiante creado correctamente',
      notifier: {
        send: true,
        nameEvent: CREATE_STUDENT_RESPONSE
      }
    })
  })
  ipcMain.on(GET_STUDENTS, async (event, params) => {
    await handleIpcHelper({
      event,
      data: params,
      callback: getStudentsController,
      notifier: {
        send: true,
        nameEvent: GET_STUDENTS_RESPONSE
      }
    })
  })
  ipcMain.on(UPDATE_STUDENT, async (event, payload) => {
    await handleIpcHelper({
      event,
      data: payload,
      callback: updateStudentController,
      successMsg: 'Estudiante actualizado correctamente',
      notifier: {
        send: true,
        nameEvent: UPDATE_STUDENT_RESPONSE
      }
    })
  })
  ipcMain.on(DELETE_STUDENT, async (event, id) => {
    await handleIpcHelper({
      event,
      data: id,
      callback: deleteStudentController,
      successMsg: 'Estudiante eliminado correctamente',
      notifier: {
        send: true,
        nameEvent: DELETE_STUDENT_RESPONSE
      }
    })
  })
}
