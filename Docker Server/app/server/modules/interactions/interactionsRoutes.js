var express = require('express');
var router = express.Router();
var interactionFunctions = require('./interactionsFunctions');

router.get('/getNewTask', function (req, res) {
    interactionFunctions.getNewTask(req, res);
});

module.exports = router;