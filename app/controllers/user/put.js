module.exports = (req, res) => {
	require('../../models/user').edit(req.user.id, req.body, (result) => {
		res.send(JSON.stringify(result));
	});
};