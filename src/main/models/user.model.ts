import { DataTypes, Model, type Sequelize } from 'sequelize'
import {
  UserRoles,
  type UserI,
  type UserRoles as UserRolesType
} from '../interfaces/user/user.interface.js'

export class UserModel extends Model<UserI> implements UserI {
  id!: number
  name!: string
  last_name!: string
  dni!: string
  email!: string
  password!: string
  role!: UserRolesType
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export const loadUserModel = (se: Sequelize) => {
  UserModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      dni: {
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
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UserRoles.SUPER_ADMIN
      }
    },
    {
      tableName: 'users',
      timestamps: true,
      paranoid: true,
      sequelize: se
    }
  )
}
