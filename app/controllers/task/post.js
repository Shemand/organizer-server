module.exports = (req, res) => {
	require('../../models/task').add(req.user.id, req.body, (result) => {
		res.send(JSON.stringify(result));
	});
};