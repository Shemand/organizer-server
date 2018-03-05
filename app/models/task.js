var db = require('../extra/database');

module.exports = {
	all : (uid, callback) => {
		var sql = 'select id, title, description, type from tasks where uid = ?';
		db.query(sql,[uid], (err, result) => {
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
			if(typeof obj.title != 'undefined')
				if(obj.title.length > 32)
					message.push("Wrong title length! Length must be less or equal 32.");
				else
					fields.title = obj.title;

			if(typeof obj.description != 'undefined')
				fields.description = obj.description;

			if(typeof obj.type != 'undefined')
				if(obj.type < 0 && obj.type > 4)
					message.push("Wrong type value! Type must be more than 0, but less or equal 4.");
				else
					fields.type = obj.type;

			if(Object.keys(fields).length == 0)
				message.push("Request doesn't contain the correct parametrs");

			if(message.length == 0){
				fields.uid = uid;
				var sql = "INSERT INTO tasks set ?";
				db.query(sql, fields, (err, result) => {
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
			var fields = {};
			var message = [];

			if(typeof obj.title != 'undefined')
				if(obj.title.length <= 32)
					fields.title = obj.title;
				else
					message.push("Wrong title length! Length must be less or equal 32.");

			if(typeof obj.description != 'undefined')
				fields.description = obj.description;
			if(typeof obj.type != 'undefined')
				if(obj.type > 0 && obj.type <= 4)
					fields.type = obj.type;
				else
					message.push("Wrong type value! Type must be more than 0, but less or equal 4.");
			
			if(Object.keys(fields).length == 0)
				message.push("Request doesn't contain the correct parametrs");

			if(message.length == 0){
				id = Number(id);

				var sql = "UPDATE tasks SET ? WHERE id=? AND uid=?";
				db.query(sql,[fields,id,uid], (err, result) => {
					if(err) throw err;

					if(result.affectedRows != 1)
						callback({success : false, message : ["Wrong task id. Doesn't exist task with such ID"]});
					else
						callback({success : true});
				});
			} else {
				callback({success : false, message : message});
			}
		} else {
			callback({succes : false, message : ["Perhaps, not all requirements were observed"]});
		}
		// edit one or many parametrs of task
	},
	archive : () => {
		// change accessable flag to false
	}
}