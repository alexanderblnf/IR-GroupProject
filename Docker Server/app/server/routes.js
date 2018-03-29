var path = require('path');
var pathMapping = {
    1: ['scripts/category-hover.js', 'scripts/list-hover.js'],
    2: ['scripts/category-hover.js', 'scripts/list-summary.js'],
    3: ['scripts/category-list-summary.js', 'scripts/no-category-list.js'],
    4: ['scripts/list-category-summary.js', 'scripts/category-no-list.js']
};

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
        if ('OPTIONS' === req.method) {
            res.sendStatus(204);
        } else {
            next();
        }
    });

    app.get(['/1', '/2', '/3', '/4', '/'], function (req, res) {
        var rootUrl = req.url.length > 1 ? req.url[1] : null;
        if (!req.session.username) {

            if (rootUrl && rootUrl in pathMapping) {
                req.session.experiment = rootUrl;
                req.session.currentInterface = 0;
            } else {
                req.session.experiment = Math.floor((Math.random() * 4) + 1);
                req.session.currentInterface = 0;
            }

            res.redirect('/register.html');
        } else {
            if (req.session.currentInterface === -1) {
                res.sendFile(path.join(__dirname, '../web/finish.html'))
            }
            res.sendFile(path.join(__dirname, '../web/index.html'))
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
            var age = req.body.age;
            var gender = req.body.gender;
            var student = req.body.student;
            var ir = req.body.ir;

            if (!req.session.experiment) {
                req.session.experiment = Math.floor((Math.random() * 4) + 1);
                req.session.currentInterface = 0;
            }

            if (age && gender && student && ir) {
                var username = new Date().getTime() + '-';
                var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                for (var i = 0; i < 5; i++) {
                    username += possible.charAt(Math.floor(Math.random() * possible.length));
                }

                var dbFunctions = require('./modules/mysql/dbFunctions');

                var options = {
                    username: username,
                    age: age,
                    gender: gender,
                    student: student,
                    course_participant: ir,
                    experiment: req.session.experiment
                };

                if (username) {
                    dbFunctions.insertNewUser(options, function (err, result) {
                        if (err) {
                            response['code'] = 500;
                            response['response'] = 'Error adding the user';
                            console.log(result);
                        } else {
                            response['code'] = 200;
                            response['response'] = '/' + req.session.currentInterface;

                            req.session.username = username;
                            req.session.userid = result.insertId;
                            req.session.task = 1;
                            req.session.queries = 0;
                            req.session.time = {
                                hours: 0,
                                minutes: 0,
                                seconds: 0
                            };
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
	        res.redirect('/');
        }
    });

    app.get('/register.html', function (req, res) {
        if (req.session.username) {
	        res.redirect('/');
        } else {
	        res.sendFile(path.join(__dirname, '../web/register.html'));
        }
    });

    var search = require('./modules/search/searchRoutes');
    app.use('/search', search);

    var interactions = require('./modules/interactions/interactionsRoutes');
    app.use('/interaction', interactions);

    var bing = require('./modules/bing/bingRoutes');
    app.use('/bing', bing);
};