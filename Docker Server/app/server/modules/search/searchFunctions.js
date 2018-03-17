var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://elasticsearch:9200'
});

exports.basicSearch = function (inputQuery, res) {
    client.search({
        body: {
            query: {
                match: {
                    title: inputQuery
                }
            },
            sort: [{
                time: {
                    title: 'asc'
                }
            }]

        }
    }).then(function (resp) {

        var out = [];
        resp.hits.hits.forEach(function (val) {
            var temp = {
                result: val["_source"]
            };
            out.push(temp);
        });

        res.send(out);
    }, function (err) {
        console.log(err);
        res.status(500).send("Server error");
    });
};