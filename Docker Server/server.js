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
    activeDuration: 10 * 60 * 1000,
    saveUninitialized: true
}));

app.post('/register', function (req, res) {
    var userName = req.body.username;
    var currentTime = new Date().getTime();
    var response = {};

    console.log(req);
    if (userName) {
        response['code'] = 200;
        response['response'] = 'Success';
        req.session.username = userName + '-' + currentTime;
    } else {
        response['code'] = 500;
        response['response'] = 'Server error';
    }

    res.send(response);
});

app.get('/', function (req, res) {
    if (req.session.username) {
        res.redirect('/index.html');
    } else {
        res.redirect('/register.html');
    }
});

app.use(express.static(path.join(__dirname, 'app/web')));
require('./app/server/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);