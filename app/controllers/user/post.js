module.exports = (req, res) => {
	require('../../models/user').add(req.body, (result) => {
		res.send(JSON.stringify(result));
	});
};