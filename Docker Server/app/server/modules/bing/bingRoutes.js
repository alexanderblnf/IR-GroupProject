var express = require('express');
var router = express.Router();
var request = require('request');
const cognitiveServices = require('cognitive-services');



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

router.get('/search-category/:query', function (req, res) {
    const inputQuery = req.params.query;
    doOne(inputQuery, res, true);

});

router.get('/search-list/:query', function (req, res) {
    const inputQuery = req.params.query;
    doOne(inputQuery, res);

});

function doOne(inputQuery, res, doCategory=false) {
    var postOptions = {
        uri: 'http://localhost:8500/categories',
        method: 'POST',
    };
    const headers = {};

    const responses = [];

    const webSearch = new cognitiveServices.bingWebSearchV7({
        apiKey: "93b0af79e01448f8b6b261ce1b72e0fd",
    });


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
        var texts = [];
        response.webPages.value.forEach(function (value, index) {
            if (value.name) {
                responses.push({
                    index: index,
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
            console.log(error);
            console.log(pyResponse);
            var array = body.replace(/['\n"]/g, '').split(",");

            for (var i = 0; i < array.length; i++) {
                array[i] = array[i].replace(/^[ ]/, '');
            }

            responses.forEach(function (value, index) {
                value['category'] = array[index];
            });

            console.log(array);

            doSecond(webSearch, parameters, responses, res, doCategory)
        });
        // res.send(response);
    }).catch((err) => {
        console.log(err);
    });
}

function doSecond(webSearch, parameters, responses, res, doCategory=false) {
    var headers = {};
    parameters['offset'] = 50;
    var postOptions = {
        uri: 'http://localhost:8500/categories',
        method: 'POST',
    };
    var responses2 = [];

    webSearch.search({
        parameters,
        headers
    }).then((response) => {
        var texts = [];
        const length = responses.length - 1;
        response.webPages.value.forEach(function (value, index) {
            if (value.name) {
                responses2.push({
                    index: length + index,
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
            var array = body.replace(/['\n"]/g, '').split(",");

            for (var i = 0; i < array.length; i++) {
                array[i] = array[i].replace(/^[ ]/, '');
            }

            responses2.forEach(function (value, index) {
                value['category'] = array[index];
            });

            console.log(array);
            var out = {};
            out['code'] = 200;

            responses = responses.concat(responses2);

            if (doCategory) {
                out['response'] = groupByCategory(responses);
            } else {
                out['response'] = responses;
            }

            res.send(out);
        });
        // res.send(response);
    }).catch((err) => {
        console.log(err);
    });
}

function groupByCategory(responses) {
    var categories = {};
    responses.forEach(function (value) {
        var category = value['category'];

        if (!categories.hasOwnProperty(category)) {
            categories[category] = [];
        }

        categories[category].push({
            title: value['title'],
            url: value['url'],
            description: value['description'],
            index: value['index']
        });
    });

    return categories;
}


module.exports = router;