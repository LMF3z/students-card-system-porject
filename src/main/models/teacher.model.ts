import { DataTypes, Model, Sequelize } from 'sequelize'
import { TeacherI } from '../interfaces/teachers/teacher-interface'
import { UserRoles } from '../interfaces/user/user.interface'

export class TeacherModel extends Model<TeacherI> implements TeacherI {
  id!: number
  first_name!: string
  second_name!: string
  first_last_name!: string
  second_last_name!: string
  dni!: string
  address!: string
  phone_number!: string
  email!: string
  password!: string
  register_by!: number
  role!: UserRoles.TEACHER

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export const loadTeacherModel = (se: Sequelize) => {
  TeacherModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      second_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      first_last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      second_last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dni: {
        type: DataTypes.STRING,
        allowNull: false
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      register_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UserRoles.TEACHER
      }
    },
    {
      tableName: 'teachers',
      timestamps: true,
      paranoid: true,
      sequelize: se
    }
  )
}
