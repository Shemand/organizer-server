var db = require('mysql').createPool(require('../settings/sqlConnectionSettings'));
module.exports = db;