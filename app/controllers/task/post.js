module.exports = (req, res) => {
	require('../../models/task').add(req.user.id, req.body.title, req.body.description, req.body.type, (result) => {
		res.send(JSON.stringify(result));
	});
};