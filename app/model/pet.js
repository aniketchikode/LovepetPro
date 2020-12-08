const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define('pet', {
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
        VetId: {
            type: Sequelize.STRING,
        },
        Role: {
            type: Sequelize.STRING,
        },
        Email: {
            type: Sequelize.STRING,
        },
        Address: {
            type: Sequelize.STRING,
        },
        Gender: {
            type: Sequelize.STRING,
        },
        MobileNo: {
            type: Sequelize.STRING,
        },
        ProfileImage: {
            type: Sequelize.STRING,
        },
       


        
    });  
    return Pet;
}
