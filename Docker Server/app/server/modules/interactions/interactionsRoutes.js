var express = require('express');
var router = express.Router();
var interactionFunctions = require('./interactionsFunctions');

router.get('/getNewTask/:task', function (req, res) {
	const taskQuery = req.params.task;
	interactionFunctions.getNewTask(taskQuery, req, res);
});

module.exports = router;