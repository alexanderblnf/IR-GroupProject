var express = require('express');
var router = express.Router();
var searchFunctions = require('./searchFunctions');

router.get('/basic/:inputQuery', function (req, res) {
    const inputQuery = req.params.inputQuery;
    searchFunctions.basicSearch(inputQuery, res);
});

module.exports = router;
