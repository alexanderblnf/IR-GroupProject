const connection = require('./connection');

exports.insertNewUser = function (options, callback) {
    var user = {
        username: options.username,
        age: options.age,
        gender: options.gender,
        student: options.student,
        course_participant: options.course_participant,
        experiment_id: options.experiment,
    };

    console.log(user);

    connection.query(
        'INSERT INTO `user` SET ?',
        user,
        function (err, result) {
            if (err) {
                callback(true, result);
            } else {
                callback(false, result);
            }
        }
    );
};

exports.getNewTask = function (task, callback) {
    connection.execute(
        'SELECT task FROM task WHERE task_id = ?',
        [task],
        function (err, results) {
            if (err) {
                callback(true, results)
            } else {
                callback(false, results);
            }
        }
    );
};

exports.getUserTask = function (user, task, callback) {
	connection.execute(
		'SELECT ut.status FROM user_task ut' +
		'INNER JOIN user u ON u.user_id = ut.user_id' +
		'WHERE u.user_id = (SELECT user_id from user_task' +
		'WHERE username = ?) AND task_id = ?',
		[user, task],
		function (err, result) {
			if (err) {
				callback(true, result);
			} else {
				callback(false, result);
			}
		}
	)
};

exports.getTaskById = function (taskId, callback) {
    connection.execute(
        'SELECT task FROM task where task_id = ?',
        [taskId],
        function (err, result) {
            if (err) {
                callback(true, result);
            } else {
                callback(false, result);
            }
        }
    );
};

exports.setExperiment = function (userName, userId, callback) {
    connection.execute(
        'SELECT * from experiment',
        [],
        function (err, results) {
            if (err) {
                callback(true, results)
            } else {
                const experiment = getValueOfListForUser(userName, results);
                connection.execute(
                    'INSERT INTO `user_experiment` (`user_id`, `experiment_id`) VALUES (?, ?)',
                    [userId, experiment.experiment_id],
                    function (err2, res2) {
                        if (err2) {
                            callback(true, res2);
                        } else {
                            callback(false, experiment);
                        }
                    }
                );
            }
        }
    );
};

exports.finish = function (options, callback) {
    connection.execute(
        'INSERT INTO user_task (user_id, task_id, hover, click, time, status, queries)' +
        ' VALUES (?, ?, ?, ?, ?, ?, ?)',
        [options.userId, options.taskId, options.hovers, options.clicks, options.time, options.status, options.queries],
        function (err, result) {
            if (err) {
                callback(true, err);
            } else {
                callback(false, result);
            }
        }
    )
};

function getValueOfListForUser(userName, list) {
    var crypto = require('crypto');
    var hash = crypto.createHash('md5').update(userName).digest('hex');

    var index = parseInt(hash) % list.length;

    return list[index];

}