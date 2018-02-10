var db = require('../extra/database');

module.exports = {
	get : (uid, callback) => {
		var sql = 'select id, title, description, type from tasks where uid = ?';
		db.query(sql,[uid], (err, result) => {
			if(err) throw err;
			result = result[0];
			result.success = true;
			callback(result);
		});
	},
	add : (uid, title, description, type, callback) => {
		var message = [];

		if(type < 0 && type > 4)
			message.push("Wrong type value! Type must be more than 0, but less or equal 4.");
		
		if(title.length > 32)
			message.push("Wrong title length! Length must be less or equal 32.");
		
		if(message.length == 0){
			var sql = "INSERT INTO tasks set ?";
			db.query(sql, {title : title, description : description, type : type, uid : uid}, (err, result) => {
				if(err) throw err;
				callback({success : true});
			});
		} else {
			callback({success : false, message : message});
		}
		
	},
	edit : (uid, tid, updObj, callback) => {
		if(typeof updObj != 'undefined'){
			var fields = {};
			var message = [];
			
			if(typeof updObj.title != 'undefined')
				if(updObj.title.length <= 32)
					fields.title = updObj.title;
				else
					message.push("Wrong title length! Length must be less or equal 32.");

			if(typeof updObj.description != 'undefined')
				fields.description = updObj.description;
			if(typeof updObj.type != 'undefined')
				if(updObj.type > 0 && updObj.type <= 4)
					fields.type = updObj.type;
				else
					message.push("Wrong type value! Type must be more than 0, but less or equal 4.");
			
			if(Object.keys(fields).length == 0)
				message.push("Request haven't parametrs.");

			if(message.length == 0){
				var sql = "UPDATE tasks SET ? WHERE id=? AND uid=?";
				db.query(sql,[fields,tid,uid], (err, result) => {
					if(err) throw err;
					console.log(result);
					if(result.affectedRows != 1)
						var response = {success : false, message : ["Wrong task id. Doesn't not exist task with such ID"]};
					else
						var response = {success : true};

					callback(response);
				});
			} else {
				callback({success : false, message : message});
			}
		}
		
		// edit one or many parametrs of task
	},
	archive : () => {
		// change accessable flag to false
	}
}