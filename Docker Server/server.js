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
    var dbFunctions = require('./app/server/modules/mysql/dbFunctions');

    if (userName) {
        var finalUsername = userName + '-' + currentTime;
        dbFunctions.insertNewUser(finalUsername, function (err, result) {
            if (err) {
                response['code'] = 500;
                response['response'] = 'Error adding the user';
            } else {
                response['code'] = 200;
                response['response'] = 'Success';
                req.session.username = finalUsername;
                req.session.userid = result.insertId;
            }

            res.send(response);
        })
    } else {
        response['code'] = 500;
        response['response'] = 'Server error';
        res.send(response);
    }
});

app.get('/register.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/web/register.html'));
});

app.get(['/*.html', '/'], function (req, res, next) {
    if (req.url !== '/register.html') {
        if (!req.session.username) {
            res.redirect('/register.html');
        }
    }

    return next();
});

app.use(express.static(path.join(__dirname, 'app/web')));
require('./app/server/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);