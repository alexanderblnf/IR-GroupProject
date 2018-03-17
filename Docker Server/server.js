var express  = require('express');
var app      = express();
var port = process.env.PORT || 8080;

app.get('/', (req, res) => res.send('Hello World!!'));

require('./app/server/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);