var express = require('express');
var router = express.Router();
var request = require('request');
const cognitiveServices = require('cognitive-services');

var postOptions = {
    uri: 'http://localhost:5000/categories',
    method: 'POST',
};


// router.get('/search/:query', function (req, res) {
//     const inputQuery = req.params.query;
//     var responses = [];
//     var texts = [];
//     bing(inputQuery, function (err, googleRes){
//         if (err) console.error(err);
//         googleRes['links'].forEach(function (link) {
//             if (link.href) {
//                 responses.push({
//                     link: link.href,
//                     title: link.title,
//                     description: link.description
//                 });
//                 texts.push(link.description);
//             }
//         });
//
//         if (nextCounter < 4) {
//             nextCounter += 1;
//             if (googleRes.next) googleRes.next();
//         } else {
//             postOptions['json'] = {
//                 'queries' : texts
//             };
//             request(postOptions, function (error, response, body) {
//                 var array = body.replace(/['\n]/g, '').split(",");
//                 // for(var i = 0; i < array.length; i++) {
//                 //     array[i] = array[i].replace(/)
//                 // }
//                 res.send(array);
//             });
//             // res.send(responses);
//         }
//     });
// });

router.get('/search/:query', function (req, res) {
    const webSearch = new cognitiveServices.bingWebSearchV7({
        apiKey: "93b0af79e01448f8b6b261ce1b72e0fd",
    });

    const inputQuery = req.params.query;

    const headers = {};

    const responses = [];

    var times = 0;


    const parameters = {
        "q": inputQuery,
        "count": 50,
        "offset": 0,
        "mkt": "en-US"
    };

    webSearch.search({
        parameters,
        headers
    }).then((response) => {
        const texts = [];
        response.webPages.value.forEach(function (value) {
            if (value.name) {
                responses.push({
                    url: value.url,
                    title: value.name,
                    description: value.snippet
                });
                texts.push(value.name + " " + value.snippet);
            }
        });

        postOptions['json'] = {
            'queries' : texts
        };

        request(postOptions, function (error, pyResponse, body) {
            var array = body.replace(/['\n]/g, '').split(",");

            responses.forEach(function (value, index) {
                value['category'] = array[index];
            });

            doSecond(webSearch, parameters, responses, res)
        });
        // res.send(response);
    }).catch((err) => {
        console.log(err);
    });

});

function doSecond(webSearch, parameters, responses, res) {
    var headers = {};
    parameters['offset'] = 50;

    webSearch.search({
        parameters,
        headers
    }).then((response) => {
        const texts = [];
        response.webPages.value.forEach(function (value) {
            if (value.name) {
                responses.push({
                    url: value.url,
                    title: value.name,
                    description: value.snippet
                });
                texts.push(value.name + " " + value.snippet);
            }
        });

        postOptions['json'] = {
            'queries' : texts
        };

        request(postOptions, function (error, pyResponse, body) {
            var array = body.replace(/['\n]/g, '').split(",");

            responses.forEach(function (value, index) {
                value['category'] = array[index];
            });

            console.log(responses.length);
            res.send(responses);
        });
        // res.send(response);
    }).catch((err) => {
        console.log(err);
    });
}


module.exports = router;