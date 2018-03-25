const dbFunctions = require('../mysql/dbFunctions');

exports.getNewTask = function (req, res) {
    var response = {};

    if (req.session.username) {
        dbFunctions.getNewTask(req.session.username, function (err, task) {
            if (err) {
                response['code'] = 500;
                response['response'] = 'DB Error';
            } else {
                response['code'] = 200;
                response['response'] = task;
            }

            res.send(response);
        })
    } else {
        response['code'] = 401;
        response['response'] = 'You are not registered';
        res.send(response);
    }
};