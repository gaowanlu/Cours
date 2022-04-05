const Works = require('./index.js');
const userRoutes = require('./test/UserRoutes');
const indexRoutes = require('./test/IndexRoutes');

/**
 * mock reuqest
 */
Works.exec("/user/743843", {
    name: 'request'
}, {
    name: 'response'
});