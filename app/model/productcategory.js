const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Productcategory = sequelize.define('productcategory', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        Category: {
            type: Sequelize.STRING,
        },
        
        
    });  
    return Productcategory;
}
