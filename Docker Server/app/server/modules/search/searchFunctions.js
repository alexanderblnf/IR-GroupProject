var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://elasticsearch:9200'
});

exports.basicSearch = function (inputQuery, res) {
    client.search({
        body: {
            query: {
                match: {
                    Title: inputQuery
                }
            }
        }
    }).then(function (resp) {
        var out = [];
	    out['code'] = 200;
	    out['response'] = [];
        resp.hits.hits.forEach(function (val) {
            var temp = {
                result: val["_source"]
            };
            out['response'].push(temp);
        });

        res.send(out);
    }, function (err) {
		var out = [];
	    out['code'] = 500;
	    out['response'] = err;
        res.send(out);
    });
};