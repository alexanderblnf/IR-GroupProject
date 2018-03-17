module.exports = function (app) {
    var search = require('./modules/search/searchRoutes');
    app.use('/search', search);
};