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
	add : (obj, callback) => {
		var message = [];
		var fields = {};

		if(typeof obj != 'undefined'){

			if(typeof obj.email != 'undefined')
				if(obj.email.length > 32)
					message.push("Wrong email length. Length must be less or equal 32.");
				else
					fields.email = obj.email;
			else
				message.push("Request doesn't contain email");

			if(typeof obj.password != 'undefined')
				if(obj.password.length > 32)
					message.push("Wrong password length. Length must be less or equal 32.");
				else
					fields.password = obj.password;
			else
				message.push("Request doesn't contain password");

			if(Object.keys(fields).length == 0)
				message.push("Request doesn't contain the correct parametrs");

			if(message.length == 0){
				var sql = "INSERT INTO users SET ?";
				db.query(sql, fields, (err, result) => {
					if(err && err.errno != 1062)
						throw err;
					else if(err != null && err.errno == 1062) 
						callback({success : false, message : ["Email already exists."]});
					else
						callback({success : true});
				});
			} else {
				callback({success : false, message : message});
			}
		} else {
			callback({success : false, message : ["Perhaps, not all requirements were observed."]});
		}

	},
	edit : (uid, obj, callback) => {
		var message = [];
		var fields = {};

		if(typeof obj != 'undefined') {
			if(typeof obj.email != 'undefined')
				if(obj.email.length > 32)
					message.push("Wrong email length. Length must be less or equal 32.");
				else
					fields.email = obj.email;
		
			if(typeof obj.password != 'undefined')
				if(obj.password.length > 32)
					message.push("Wrong password length. Length must be less or equal 32.");
				else
					fields.password = obj.password;

			if(Object.keys(fields).length == 0)
				message.push("Request doesn't contain the correct parametrs");

			if(message.length == 0){
				var sql = "UPDATE users SET ? WHERE id = ?";
				db.query(sql, [fields,uid],(err, result) => {
					if(err && err.errno != 1062)
						throw err;
					else if(err != null && err.errno == 1062)
						callback({success : false, message : "Email already exists."});
					else
						callback({success : true});
				});
			} else {
				callback({success : false, message : message});
			}
		} else {
			callback({success : false, message : ["Perhaps, not all requirements were observed."]});
		}

	},
	delete : () => {
		// change accessable flag to false
	},
	recovery : () => {
		// change accessable flag to true
	}
}