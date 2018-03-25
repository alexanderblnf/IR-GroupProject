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

    var search = require('./modules/search/searchRoutes');
    app.use('/search', search);

    var interactions = require('./modules/interactions/interactionsRoutes');
    app.use('/interaction', interactions);

    var google = require('./modules/google/googleRoutes');
    app.use('/google', google);
};