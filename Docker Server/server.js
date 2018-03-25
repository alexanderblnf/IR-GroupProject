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


app.get('/', function (req, res, next) {
    if(!req.session.username) {
        var username = new Date().getTime() + '-';
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++) {
            username += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        var response = {};
        var dbFunctions = require('./app/server/modules/mysql/dbFunctions');

        if (username) {
            dbFunctions.insertNewUser(username, function (err, result) {
                if (err) {
                    response['code'] = 500;
                    response['response'] = 'Error adding the user';
                } else {
                    response['code'] = 200;
                    response['response'] = 'Success';
                    req.session.username = username;
                    req.session.userid = result.insertId;
                    req.session.task = 1;
                }

                return next();
            })
        } else {
            response['code'] = 500;
            response['response'] = 'Server error';
            res.send(response);
        }
    } else {
        return next();
    }
});


app.use(express.static(path.join(__dirname, 'app/web')));
require('./app/server/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);