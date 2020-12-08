const sequelize = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Tips = sequelize.define('tips', {
        id: {
            type: Sequelize.INTEGER,
            
            autoIncrement: true,
            primaryKey: true
        },
        VetId: {
            type: Sequelize.STRING,
        },
        Titel: {
            type: Sequelize.STRING,
        },
        Discription: {
            type: Sequelize.STRING,
        },

        
    });  
    return Tips;
}
