const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Bookappointment = sequelize.define('bookappointment', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        UserId: {
            type: Sequelize.STRING,
        },
        VetId: {
            type: Sequelize.STRING,
        },
        SlotId: {
            type: Sequelize.STRING,
        },
        Slot: {
            type: Sequelize.STRING,
        },
        Date: {
            type: Sequelize.STRING,
        },
        
    
    });  
    return Bookappointment;
}
