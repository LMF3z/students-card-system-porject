import { DataTypes, Model, Sequelize } from 'sequelize'

import { SchoolGradesI } from '../interfaces/grades/grades.interface'

export class GradesModel extends Model<SchoolGradesI> implements SchoolGradesI {
  id!: number
  register_by!: number
  grade_title!: string
  grade_section!: string

  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export const loadGradesModel = (se: Sequelize) => {
  GradesModel.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false
      },
      register_by: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      grade_title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grade_section: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'school_grades',
      timestamps: true,
      paranoid: true,
      sequelize: se
    }
  )
}
