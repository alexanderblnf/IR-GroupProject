var express = require('express');
var router = express.Router();
var searchFunctions = require('./searchFunctions');
module.exports = function () {
    router.get('/basic/:inputQuery', function (req, res) {
        const inputQuery = req.params.inputQuery;
        searchFunctions.basicSearch(inputQuery, res);
    });
};
