module.exports = (req, res) => {
	require('../../models/user').add(req.body.email, req.body.password, (result) => {
		res.send(JSON.stringify(result));
	});
};