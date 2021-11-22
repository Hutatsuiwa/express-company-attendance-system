const mysql = require('mysql');
const { DATABASE_CONFIG, DATABASE_POOL } = require('../config/config_default');
const poolextend = require('../utils/poolextent')


module.exports = mysql.createPool(poolextend(DATABASE_POOL,DATABASE_CONFIG));


