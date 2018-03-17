var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://elasticsearch:9200'
});

exports.basicSearchWithCategories = function (inputQuery, res) {
    client.search({
        body: {
            query: {
                match: {
                    Title: inputQuery
                }
            }
        }
    }).then(function (resp) {
        var out = {};
        out['code'] = 200;

        var categories = {};

        resp.hits.hits.forEach(function (val) {
            var result = val['_source'];
            var category = result['Primary Category'];

            if (!categories.hasOwnProperty(category)) {
                categories[category] = [];
            }

            categories[category].push({
               title: result['Title'],
               url: result['URL']
            });
        });

        out['response'] = categories;

        console.log(out);
        res.send(out);
    }, function (err) {
        var out = [];
        out['code'] = 500;
        out['response'] = err;
        res.send(out);
    });
};

exports.basicSearchWithoutCategories = function (inputQuery, res) {
    client.search({
        body: {
            query: {
                match: {
                    Title: inputQuery
                }
            }
        }
    }).then(function (resp) {
        var out = {};
        out['code'] = 200;
        out['response'] = [];

        resp.hits.hits.forEach(function (val) {
            var result = val['_source'];

            out['response'].push({
                title: result['Title'],
                url: result['URL'],
	            category: result['Primary Category'],
	            secondaryCategory: result['Secondary Category']
            });
        });

        res.send(out);
    }, function (err) {
        var out = [];
        out['code'] = 500;
        out['response'] = err;
      
        res.send(out);
    });
};