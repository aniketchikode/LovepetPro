const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Loyalty = sequelize.define('loyalty', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        VetId: {
            type: Sequelize.STRING,
        },
        Discription: {
            type: Sequelize.STRING,
        },
        Image: {
            type: Sequelize.STRING,
        },

        
    });  
    return Loyalty;
}
