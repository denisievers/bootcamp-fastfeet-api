import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import dataBaseConfig from '../config/database';

const models = [User, Recipient];

class Database {
  constructor() {
    this.init();
  }

  init() {
    // Realiza a conexão com o banco de dados
    this.connection = new Sequelize(dataBaseConfig);

    models.map((model) => model.init(this.connection));
  }
}

export default new Database();
