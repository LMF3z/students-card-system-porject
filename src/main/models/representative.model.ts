import { DataTypes, Model, Sequelize } from 'sequelize'
import { RepresentativeI } from '../interfaces/representatives/representative.interface'

export class RepresentativeModel extends Model<RepresentativeI> implements RepresentativeI {
  id!: number
  first_name!: string
  second_name!: string
  first_last_name!: string
  second_last_name!: string
  dni!: string
  address!: string
  phone_number!: string
  register_by!: number

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export const loadRepresentativeModel = (sequelize: Sequelize) => {
  RepresentativeModel.init(
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
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false
      },
      register_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: 'representatives',
      timestamps: true,
      paranoid: true,
      sequelize: sequelize
    }
  )
}
