var db = require('../extra/database');

module.exports = {
	all : (uid, callback) => {
		var sql = "SELECT name, country FROM contacts WHERE uid= ?";
		db.query(sql, [uid], (err, result) =>{
			if(err) throw err;
			callback({
				data : result,
				success : true
			});
		});
	},
	add : (uid, obj, callback) => {
		var message = [];
		var fields = {};

		if(typeof obj != 'undefined'){
			if(obj.name > 32)
				message.push("Wrong name length. Length must be less or equal 32.");
			else
				fields.name = obj.name;

			if(obj.country > 32)
				message.push("Wrong country length. Length must be less or equal 32.");
			else
				fields.country = obj.country;

			if(Object.keys(fields).length == 0)
				message.push("Request doesn't contain the correct parametrs");

			if(message.length == 0){
				fields.uid = uid;
				var sql = "INSERT INTO contacts SET ?";
				db.query(sql,fields, (err, result) => {
					if(err) throw err;
					callback({success : true});
				});
			} else {
				callback({success : false, message : message});
			}
		} else {
			callback({success : false, message : ["Perhaps, not all requirements were observed."]});
		}

	},
	edit : (uid, id, obj, callback) => {
		if(typeof obj != 'undefined' && typeof id != 'undefined'){
			var message = [];
			var fields = {};

			if(typeof obj.country != 'undefined')
				if(obj.country.length <= 32)
					fields.country = obj.country;
				else
					message.push("Wrong country length. Length must be less or equal 32.");

			if(typeof obj.name != 'undefined')
				if(obj.name.length <= 32)
					fields.name = obj.name;
				else
					message.push("Wrong name length. Length must be less or equal 32.");

			if(Object.keys(fields).length == 0)
				message.push("Request doesn't contain the correct parametrs");

			if(message.length == 0){
				id = Number(id);

				var sql = "UPDATE contacts SET ? WHERE id=? AND uid=?";
				db.query(sql, [fields,id,uid], (err, result) => {
					if(err) throw err;
					console.log(result);
					if(result.affectedRows == 0)
						callback({success : false, message : ["Wrong contact ID. Doesn't exist contact with such ID."]});
					else
						callback({success : true});
				});
			} else {
				callback({success : false, message : message});
			}
		} else {
			callback({succes : false, message : ["Wrong request format. Perhaps, not all requirements were observed."]});
		}
		// edit one or many parametrs of contact
	},
	delete : () => {
		// change accessable flag to false
	},
	recovery : () => {
		// change accessable flag to true
	}
}