var express  = require('express');
var app      = express();
var port = process.env.PORT || 8080;
var path = require('path');

app.use(express.static(path.join(__dirname, 'app/web')));

require('./app/server/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);