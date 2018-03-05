module.exports = (req, res) => {
	var form = '<form action="/session" method="post"><input type="text" name="email"><input type="text" name="password"><button type="submit">GO!</button></form>';
	res.send(form);
}