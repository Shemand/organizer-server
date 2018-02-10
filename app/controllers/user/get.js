module.exports = (req, res) => {
	require('../../models/user').get(req.user.id, (result) => {
		res.send(JSON.stringify(result));
	});
};