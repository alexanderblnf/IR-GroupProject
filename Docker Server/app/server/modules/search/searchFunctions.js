var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://elasticsearch:9200'
});

exports.basicSearch = function () {
    client.ping({
        // ping usually has a 3000ms timeout
        requestTimeout: Infinity,
        // undocumented params are appended to the query string
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            return false;
        } else {
            return true;
        }
    });
};