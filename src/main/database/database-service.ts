import { Sequelize } from 'sequelize'
import { loadUserModel, loadGradesModel, loadTeacherModel } from '../models/index.js'

export class Connection {
  static sequelize: Sequelize

  static async initialize() {
    this.sequelize = new Sequelize('students_card_db', 'root', 'rootpass', {
      host: 'localhost',
      port: Number(3306),
      dialect: 'mysql',
      logging: false
    })

    try {
      await this.sequelize.authenticate()

      loadUserModel(this.sequelize)
      loadGradesModel(this.sequelize)
      loadTeacherModel(this.sequelize)

      await this.sequelize.sync()

      console.log(`db ${process.env.DATABASE_NAME} is connected class`)
    } catch (error) {
      console.error('Unable to connect to the database:', error)
      throw error
    }
  }

  static getSequelize = () => {
    if (!this.sequelize) {
      throw new Error('Database not initialized. Call initialize() first.')
    }

    return this.sequelize
  }
}
