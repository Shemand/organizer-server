var passport = require('../../extra/auth');
auth = passport.authenticate('local', {
		successRedirect : '/',
		failureRedirect : '/login',
		failureFlash : false
});
module.exports = auth;
