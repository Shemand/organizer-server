var express = require('express');
var sql = require('mysql');
var bodyParser = require('body-parser');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var passport = require('./app/extra/auth.js');
var controller = require('./app/controllers/controller');

var app = express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(cookieParser());
app.use(session({secret : 'india'}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req,res,next) => {
	if(req.url != "/session" && req.method != "POST")
		req.isAuthenticated() ? next() : res.send({success : false, message : ["You not authenticated. Send POST request to '/session'."]});
	else
		next();
});

app.use('/', controller);

app.listen(8081, () => {
	console.log('server started');
});