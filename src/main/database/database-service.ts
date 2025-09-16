import { Sequelize } from 'sequelize';
import { loadUserModel } from '../models/user.model.js';

export class Connection {
  static sequelize: Sequelize;

  static async initialize() {
    this.sequelize = new Sequelize(
      process.env.DATABASE_NAME!,
      process.env.DATEBASE_USERNAME!,
      process.env.DATEBASE_USERPASSWORD,
      {
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        dialect: 'mysql',
        logging: false,
      }
    );

    try {
      await this.sequelize.authenticate();

      loadUserModel(this.sequelize);

      await this.sequelize.sync();

      console.log(`db ${process.env.DATABASE_NAME} is connected class`);
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      throw error;
    }
  }

  static getSequelize = () => {
    if (!this.sequelize) {
      throw new Error('Database not initialized. Call initialize() first.');
    }

    return this.sequelize;
  };
}
