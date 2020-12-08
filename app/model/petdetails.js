const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Petdetails = sequelize.define('petdetails', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        PetId: {
            type: Sequelize.STRING,
        },
        PetName: {
            type: Sequelize.STRING,
        },
        UserId: {
            type: Sequelize.STRING,
        },
        Breed: {
            type: Sequelize.STRING,
        },
        Diet: {
            type: Sequelize.STRING,
        },
        PetGender: {
            type: Sequelize.STRING,
        },
        Age: {
            type: Sequelize.STRING,
        },
        OwnerName: {
            type: Sequelize.STRING,
        },
        OwnerContact: {
            type: Sequelize.STRING,
        },
        Discription: {
            type: Sequelize.STRING,
        },
        Behavior: {
            type: Sequelize.STRING,
        },
        LifeExpetance: {
            type: Sequelize.STRING,
        },
        Color: {
            type: Sequelize.STRING,
        },
        Hight: {
            type: Sequelize.STRING,
        },
        Weight: {
            type: Sequelize.STRING,
        },
        PetImage: {
            type: Sequelize.STRING,
        },
        


        
    });  
    return Petdetails;
}
