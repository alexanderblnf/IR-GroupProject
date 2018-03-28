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
		status : req.body.status,
	};

    interactionFunctions.finish(options, req, res);
});

router.post('/time', function (req, res) {
	req.session.time = {
		hours: req.body.hours,
		minutes: req.body.minutes,
		seconds: req.body.seconds
	};
	req.session.save();

	res.send({
		code: 200,
		response: 'saved time'
	})
});

router.get('/getTime', function (req, res) {
	res.send({
		code: 200,
		response: req.session.time
	});
});

module.exports = router;