const user = require('./users');
const movies = require('./movies');
const auth = require('./auth');

module.exports = function(app) {
    app.get('/', function() { ... });
    app.get('/another-path', function() { ... });

    app.get('/user/:id', user.display);
    app.post('/user/:id', user.update);
};