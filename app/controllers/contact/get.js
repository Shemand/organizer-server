module.exports = (req, res) => {
	require('../../models/contact').all(req.user.id, (result) => {
		res.send(JSON.stringify(result));
	});
};