var express  = require('express');
var app      = express();
var port = process.env.PORT || 8080;

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://elasticsearch:9200',
    log: 'trace'
});

app.get('/', (req, res) => res.send('Hello World!!'));

app.get('/test', (req, res) => function () {
    client.ping({
        // ping usually has a 3000ms timeout
        // undocumented params are appended to the query string
        hello: "elasticsearch!"
    }, function (error) {
        if (error) {
            res.send("Error");
        } else {
            res.send("All good!")
        }
    }).then(function (req, res) {
        res.send("finito");
    });

});

app.listen(port);
console.log('The magic happens on port ' + port);