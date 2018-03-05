module.exports = (req, res) => {
	require('../../models/contact').add(req.user.id, req.body, (result) => {
		res.send(JSON.stringify(result));
	});
};