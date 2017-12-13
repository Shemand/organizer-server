var express = require('express');
var sql = require('mysql');
var passport = require('passport');

var app = express();
var db = sql.createPool(require('./sqlConnectionSettings.js'));

app.get('/', require('./app/controllers/controller.js'));

app.listen(8080, () => {
	console.log('server started');
});