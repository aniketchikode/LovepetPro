const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Vaccine = sequelize.define('vaccine', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        VetId: {
            type: Sequelize.STRING,
        },
        PetId: {
            type: Sequelize.STRING,
        },
        VaccineName: {
            type: Sequelize.STRING,
        },
        Discription: {
            type: Sequelize.STRING,
        },
        Date: {
            type: Sequelize.STRING,
        },
        
        
    });  
    return Vaccine;
}
