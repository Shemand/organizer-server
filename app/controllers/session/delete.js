module.exports = (req, res) => {
	req.logOut();
	res.send({success : true});
}