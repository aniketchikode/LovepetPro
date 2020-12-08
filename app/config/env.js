const Sequelize = require('sequelize');

const env = {
    database: 'Lovepet',
    username: 'root',
    password: '',
    host:  "0.0.0.0",
    dialect: 'mysql',
     port:'3306',
  
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
  }; 

  
  module.exports = env;
