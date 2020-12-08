const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Servicecategory = sequelize.define('servicecategory', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Category: {
            type: Sequelize.STRING,
        },
        
        
    });  
    return Servicecategory;
}
