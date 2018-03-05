var db = require('../../extra/database');

module.exports = (req, res) => {
	require('../../models/task').all(req.user.id, (result) => {
		res.send(JSON.stringify(result));
	});
};