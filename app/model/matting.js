const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Matting = sequelize.define('matting', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        PetId: {
            type: Sequelize.STRING,
        },
        VetId: {
            type: Sequelize.STRING,
        },
        Status: {
            type: Sequelize.BOOLEAN,
        },
        
    
        
    });  
    return Matting;
}
