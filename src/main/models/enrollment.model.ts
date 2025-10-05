import { DataTypes, Model, Sequelize } from 'sequelize'
import { EnrollmentI } from '../interfaces/enrollment/enrollment.interface'

export class EnrollmentModel extends Model<EnrollmentI> implements EnrollmentI {
  id!: number
  student_id!: number
  school_grade!: number
  start_period!: number
  end_period!: number

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export const loadEnrollmentModel = (se: Sequelize) => {
  EnrollmentModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      student_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      school_grade: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      start_period: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      end_period: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'enrollments',
      timestamps: true,
      paranoid: true,
      sequelize: se
    }
  )
}
