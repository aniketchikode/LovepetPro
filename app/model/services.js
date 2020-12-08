const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Service = sequelize.define('service', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        VetId: {
            type: Sequelize.STRING,
        },
        ServiceName: {
            type: Sequelize.STRING,
        },
        Category: {
            type: Sequelize.STRING,
        },
        Price: {
            type: Sequelize.STRING,
        },
        Discount: {
            type: Sequelize.STRING,
        },
        DiscountPrice: {
            type: Sequelize.STRING,
        },
        Description: {
            type: Sequelize.STRING,
        },
        ServiceImage: {
            type: Sequelize.STRING,
        },
        


        
    });  
    return Service;
}
