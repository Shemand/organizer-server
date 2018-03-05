var passport = require('../../extra/auth');
// var auth = passport.authenticate('local', {
// 		successRedirect : '/',
// 		failureRedirect : '/session',
// 		failureFlash : false
// });

// auth = passport.authenticate('local', (req, res) => {
// 	// req.isAuthenticated() ? res.send({success : true}) : res.send({success : false, message : ["You not authenticated. Send POST request to '/session'."]})
// 	res.send(req);
// });
module.exports = (req, res, next) => {
	console.log("req on session POST");
	passport.authenticate('local', {session : true}, function(err, user, info, status){
		if(err) throw err;
		console.log(req._passport.session);
		if(!user) { res.send({success : false, message : "something wrong with authenticate."})}
		else {
			req.logIn(user, (err) => {
				if(err) throw err;
				res.send({success : true});
			});
		}
	})(req,res,next);
};
