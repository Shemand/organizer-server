var db = require('../extra/database');

module.exports = {
	get : (uid, callback) => {
		var sql = 'select email from users where id = ? limit 1';
		db.query(sql, [uid], (err, result) => {
			if(err) throw err;
			result = result[0];
			result.success = true;
			callback(result);
		});
	},
	add : (email, password, callback) => {
		var message = [];

		if(email.length > 32)
			message.push("Wrong email length. Length must be less or equal 32.");
		if(password.length > 32)
			message.push("Wrong password length. Length must be less or equal 32.");

		if(message.length == 0){
			var sql = "INSERT INTO users SET ?";
			db.query(sql,{email : email, password : password}, (err, result) => {
				if(err) throw err;
				callback({success : true});
			});
		} else {
			callback({success : false, message : message});
		}
	},
	edit : (uid, updObj, callback) => {
		var message = [];
		var fields = {};

		if(typeof updObj.email != 'undefined')
			if(updObj.email.length > 32)
				message.push("Wrong email length. Length must be less or equal 32.");
			else
				fields.email = updObj.email;
	
		if(typeof updObj.password != 'undefined')
			if(updObj.password.length > 32)
				message.push("Wrong password length. Length must be less or equal 32.");
			else
				fields.password = updObj.password;

		if(message.length == 0){
			var sql = "UPDATE users SET ? WHERE id = ?";
			db.query(sql, [fields,uid,updObj.email],(err, result) => {
				if(err && err.errno != 1062)
					throw err;
				else if(err != null && err.errno == 1062)
					var response = {success : false, message : "Email already exists."};
				else
					var response = {success : true};
				
				
				callback(response);
			});
		} else {
			callback({success : false, message : message});
		}
	},
	delete : () => {
		// change accessable flag to false
	},
	recovery : () => {
		// change accessable flag to true
	}
}