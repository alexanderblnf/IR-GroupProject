var google = require('google');
var express = require('express');
var router = express.Router();

google.resultsPerPage = 25;
var nextCounter = 0;

router.get('/search/:query', function (req, res) {
    const inputQuery = req.params.query;
    var responses = [];
    google(inputQuery, function (err, googleRes){
        if (err) console.error(err);
        googleRes['links'].forEach(function (link) {
            if (link.href) {
                responses.push({
                    link: link.href,
                    title: link.title,
                    description: link.description
                });
            }
        });

        if (nextCounter < 4) {
            nextCounter += 1;
            if (googleRes.next) googleRes.next();
        } else {
            res.send(responses);
        }
    });
});

module.exports = router;