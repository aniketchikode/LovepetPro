const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Products = sequelize.define('products', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        VetId: {
            type: Sequelize.STRING,
        },
        ProductName: {
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
        ProductImage: {
            type: Sequelize.STRING,
        },
        


        
    });  
    return Products;
}
