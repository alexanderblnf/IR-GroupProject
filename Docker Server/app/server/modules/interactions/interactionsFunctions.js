const dbFunctions = require('../mysql/dbFunctions');

exports.getNewTask = function (req, res) {
    var response = {};

    if (req.session.username) {
        dbFunctions.getTaskById(req.session.task, function (err, task) {
            if (err) {
                response['code'] = 500;
                response['response'] = 'DB Error';
            } else {
                response['code'] = 200;
                response['response'] = task[0].task;
            }

            res.send(response);
        })
    } else {
        response['code'] = 401;
        response['response'] = 'You are not registered';
        res.send(response);
    }
};

exports.getUserTask = function (taskQuery, req, res) {
	var response = {};

	if (req.session.username) {
		dbFunctions.getUserTask(req.session.username, taskQuery, function (err, task) {
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

exports.finish = function (options, req, res) {
    var response = {};
    if(req.session.username) {
        options.userId = req.session.userid;
        options.taskId = req.session.task;
        options.queries = req.session.queries;
        dbFunctions.finish(options, function (err, result) {
            if (err) {
                response['code'] = 500;
                response['response'] = result;
            } else {
                response['code'] = 200;
                response['response'] = result;

                if (req.session.task % 7 === 0) {
                    req.session.currentInterface = (req.session.currentInterface === 0) ? 1 : -1;
                }

                req.session.task ++;

                req.session.queries = 0;
                req.session.time = {
                    hours: 0,
                    minutes: 0,
                    seconds: 0
                };
            }

            res.send(response);
        });
        req.session.save();
    } else {
        response['code'] = 401;
        response['response'] = 'You are not registered';
        res.send(response);
    }
};
