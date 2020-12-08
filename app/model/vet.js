const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Vet = sequelize.define('vet', {
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
        DOB: {
            type: Sequelize.STRING,
        },
        Experience: {
            type: Sequelize.STRING,
        },
        ProfileImage: {
            type: Sequelize.STRING,
        },
        ClinicName: {
            type: Sequelize.STRING,
        },
        ClinicAddress: {
            type: Sequelize.STRING,
        },
        ClinicTime: {
            type: Sequelize.STRING,
        },
        AppointmentTime: {
            type: Sequelize.STRING,
        },
        StartDate: {
            type: Sequelize.STRING,
        },
        EndDate: {
            type: Sequelize.STRING,
        },


        
    });  
    return Vet;
}
