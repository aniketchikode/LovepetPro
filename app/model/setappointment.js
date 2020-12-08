const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Setappointment = sequelize.define('setappointment', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        VetId: {
            type: Sequelize.STRING,
        },
        TimeFrom: {
            type: Sequelize.STRING,
        },
        TimeTo: {
            type: Sequelize.STRING,
        },
        Date: {
            type: Sequelize.STRING,
        },
        Status: {
            type: Sequelize.STRING,
        },
        
    
        
    });  
    return Setappointment;
}
