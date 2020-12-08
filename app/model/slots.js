const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Slots = sequelize.define('slots', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Slots: {
            type: Sequelize.STRING,
        },
        
        
    });  
    return Slots;
}
