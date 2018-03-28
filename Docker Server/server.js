var express  = require('express');
var app      = express();
var session = require('express-session');
var port = process.env.PORT || 8080;
var path = require('path');
var bodyParser = require('body-parser');
var pathMapping = {
    1: ['scripts/category-hover.js', 'scripts/list-hover.js'],
    2: ['scripts/category-hover.js', 'scripts/list-summary.js'],
    3: ['scripts/category-list-summary.js', 'scripts/no-category-list.js'],
    4: ['scripts/list-category-summary.js', 'scripts/category-no-list.js']
};

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

app.get(['/1', '/2', '/3', '/4', '/'], function (req, res, next) {
    var rootUrl = req.url.length > 1 ? req.url[1] : null;
    if (!req.session.username) {
        console.log(rootUrl);
        if (rootUrl && rootUrl in pathMapping) {
            req.session.experiment = rootUrl;
            req.session.currentInterface = 0;
        } else {
            var index = Math.floor((Math.random() * 4) + 1);
            req.session.experiment = index;
            req.session.currentInterface = 0;
        }
        res.redirect('/register.html');
    } else {
        res.sendFile(path.join(__dirname, 'app/web/index.html'))
    }
});

app.get('/getInterface', function (req, res) {
    var response = {};
    if(req.session.username) {
        response['code'] = 200;
        response['response'] = pathMapping[req.session.experiment][req.session.currentInterface];
    } else {
        response['code'] = 400;
        response['response'] = 'You are not registered!'
    }

    res.send(response);
});

app.post('/register', function (req, res, next) {
    if (!req.session.username) {
        var response = {};
        console.log(req.body);
        var age = req.body.age;
        var gender = req.body.gender;
        var student = req.body.student;
        var ir = req.body.ir;

        if (age && gender && student && ir) {
            var username = new Date().getTime() + '-';
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++) {
                username += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            var dbFunctions = require('./app/server/modules/mysql/dbFunctions');

            var options = {
                username: username,
                age: age,
                gender: gender,
                student: student,
                course_participant: ir
            };

            if (username) {
                dbFunctions.insertNewUser(options, function (err, result) {
                    if (err) {
                        response['code'] = 500;
                        response['response'] = 'Error adding the user';
                    } else {
                        response['code'] = 200;
                        response['response'] = '/' + req.session.currentInterface;
                        req.session.username = username;
                        req.session.userid = result.insertId;
                        req.session.task = 1;
                    }

                    res.send(response);
                })
            } else {
                response['code'] = 500;
                response['response'] = 'Server error';
                res.send(response);
            }
        } else {
            response['code'] = 400;
            response['response'] = 'Bad Form';
            res.send(response);
        }
    } else {
        return next();
    }
});

app.get('/register.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'app/web/register.html'));
});

// app.get('/', function (req, res, next) {
//
// });


app.use(express.static(path.join(__dirname, 'app/web')));
require('./app/server/routes.js')(app);

app.listen(port);
console.log('The magic happens on port ' + port);