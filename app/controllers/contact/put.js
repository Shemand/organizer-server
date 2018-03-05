module.exports = (req, res) => {
	require('../../models/contact').edit(req.user.id, req.body.id, req.body, (result) => {
		res.send(JSON.stringify(result));
	});
};