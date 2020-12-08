const Sequelize = require('sequelize');
const env = require('./env.js');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host_name: env.host_name,
  port:env.port,
  dialect:env.dialect,
  operatorsAliases: false,
  logging: false,
  // socketPath:env.socketPath,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
    // max: 5,
	  // min: 0,
	  // acquire: 30000,
	  // idle: 10000

  }



});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.login =  require('../model/login.js')(sequelize, Sequelize);
db.pet =  require('../model/pet.js')(sequelize, Sequelize);
db.vet =  require('../model/vet.js')(sequelize, Sequelize);
db.petdetails =  require('../model/petdetails.js')(sequelize, Sequelize);
db.products =  require('../model/products.js')(sequelize, Sequelize);
db.bookappointment =  require('../model/bookappointment.js')(sequelize, Sequelize);
db.setappointment =  require('../model/setappointment.js')(sequelize, Sequelize);
db.slots =  require('../model/slots.js')(sequelize, Sequelize);
db.service =  require('../model/services.js')(sequelize, Sequelize);
db.productcategory =  require('../model/productcategory.js')(sequelize, Sequelize);
db.servicecategory =  require('../model/servicecategory.js')(sequelize, Sequelize);
db.vaccine =  require('../model/vaccine.js')(sequelize, Sequelize);
db.tips =  require('../model/tips.js')(sequelize, Sequelize);
db.loyalty =  require('../model/loyalty.js')(sequelize, Sequelize);
db.matting =  require('../model/matting.js')(sequelize, Sequelize);



// Here we can connect users and jwttoken base on users'id
// db.users.hasMany(db.jwttokon, {foreignKey: 'id'});
// db.jwttokon.belongsTo(db.users, {foreignKey: 'UserId'}); 

module.exports = db;
