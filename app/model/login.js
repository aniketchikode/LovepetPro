const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Login = sequelize.define('login', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Name: {
            type: Sequelize.STRING,
        },
        UserId: {
            type: Sequelize.STRING,
        },
        Role: {
            type: Sequelize.STRING,
        },
        Password: {
            type: Sequelize.STRING,
        },
        
    
        
    });  
    return Login;
}
