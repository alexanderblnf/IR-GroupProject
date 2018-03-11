var express = require('express');
var router = express.Router();
var searchFunctions = require('./searchFunctions');

router.get('/basic', function (req, res) {
    searchFunctions.basicSearch();
});