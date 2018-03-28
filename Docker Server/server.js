var express  = require('express');
var app      = express();
var session = require('express-session');
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(session({
    cookieName: 'session',
    secret: 'puiulmic',
    resave: false,
    duration: 100 * 60 * 1000,
    activeDuration: 100 * 60 * 1000,
    saveUninitialized: true
}));

require('./app/server/routes.js')(app);
app.use(express.static(path.join(__dirname, 'app/web')));

app.listen(port);
console.log('The magic happens on port ' + port);