module.exports = (req,res) => {
	if(req.isAuthenticated())
		res.send("<h1>Index page</h1><p>" + req.user.id + "</p>");
	else
		res.send("none");
}