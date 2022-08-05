import Sequelize from 'sequelize';
import mongoose from 'mongoose';
import File from '../app/models/File.js';
import User from '../app/models/User.js';
import Appointment from '../app/models/Appointment.js';
import databaseConfig from '../config/database.js';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb+srv://sys_agendamento:ghky5xuJjdKIIgFK@cluster0.flfpc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true }
    )
  }
}

export default new Database();