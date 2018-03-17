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
        console.log(resp);
        resp.hits.hits.forEach(function (val) {
            var temp = {
                result: val["_source"]
            };
            out.push(temp);
        });

        res.send(out);
    }, function (err) {
        console.log(err);
        res.status(500).send(err);
    });
};