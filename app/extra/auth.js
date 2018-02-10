var passport = require('passport');
var LocalStategy = require('passport-local').Strategy;
var db = require('./database');

passport.use(new LocalStategy({
	usernameField : 'email',
	passwordField : 'password'
},(email, password, done) => {
	var sql = 'select id from users where email' + email + ' and password =' + password;
	db.query('select id from users where email=? and password=?', [email, password],(err,result) => {
		if(err) throw err;
		if(result.length == 1)
			done(null, {uid : result[0].id});	
		else
			return done(null, false);
	});
}));

passport.serializeUser((user, done) => {
	console.log("serialize = " + user);
	done(null, user.uid);
});
passport.deserializeUser((uid, done) => {
	console.log("deserialize = " + uid);
	done(null, {id : uid});
});

module.exports = passport;