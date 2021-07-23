module.exports = function (req, res, next) {
	console.log(req, res, next)
	if(req.path.match(/[A-Z]/)) {
	  	const newPath = req.path.toLowerCase()
	  	res.redirect(301, req.originalUrl.replace(req.path, newPath))
	  	return
	}

	if(req.path.indexOf('.') == -1 && !req.path.endsWith('/')) {
	  	const newPath = req.path + '/'
	  	res.redirect(301, req.originalUrl.replace(req.path, newPath))    
	  	return
	}

	if(req.hostname == "www.home-optic.ru") {
	  	res.redirect(301, "https://www.home-optic.ru" + req.originalUrl)
	  	return
	}

  	next()
}