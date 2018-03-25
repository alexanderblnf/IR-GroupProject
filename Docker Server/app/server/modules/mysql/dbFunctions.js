const connection = require('./connection');

exports.insertNewUser = function (userName, callback) {
    var user = {
        username: userName
    };

    connection.query(
        'INSERT INTO `user` SET ?',
        user,
        function (err, result) {
            if (err) {
                callback(true);
            } else {
                callback(false, result);
            }
        }
    );
};

exports.getNewTask = function (userName, callback) {
    connection.execute(
        'SELECT task FROM task ' +
        'WHERE task not in (SELECT t.task from task t INNER JOIN user_task ut ON t.task_id = ut.task_id INNER JOIN user u ON ut.user_id ' +
        'WHERE u.username = ?)',
        [userName],
        function (err, results) {
            if (err) {
                callback(true)
            } else {
                const task = getValueOfListForUser(userName, results);
                callback(false, task);
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
                callback(true)
            } else {
                const experiment = getValueOfListForUser(userName, results);
                connection.execute(
                    'INSERT INTO `user_experiment` (`user_id`, `experiment_id`) VALUES (?, ?)',
                    [userId, experiment.experiment_id],
                    function (err2) {
                        if (err2) {
                            callback(true);
                        } else {
                            callback(false, experiment);
                        }
                    }
                );
            }
        }
    );
};

function getValueOfListForUser(userName, list) {
    var crypto = require('crypto');
    var hash = crypto.createHash('md5').update(userName).digest('hex');

    var index = parseInt(hash) % list.length;

    return list[index];

}