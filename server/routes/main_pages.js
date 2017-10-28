var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
	res.render('pages/index', {
		title: "Homepage",
		pageClass: "homepage"
	});
});

router.get('/', (req, res) => {
	res.render('pages/test', {
		title: "Test Page"
	});
});


module.exports = router;