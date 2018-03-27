var express = require('express');
var router = express.Router();
var interactionFunctions = require('./interactionsFunctions');

router.get('/getNewTask', function (req, res) {
	interactionFunctions.getNewTask(req, res);
});

router.post('/finish', function (req, res) {
	var options = {
        clicks : req.body.click,
		hovers : req.body.hover,
		time : req.body.time,
		status : req.body.status
	};

    interactionFunctions.finish(options, req, res);
});

module.exports = router;