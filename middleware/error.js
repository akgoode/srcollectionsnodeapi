const debug = require('debug')('app:server');

module.exports = (err, req, res, next) => {
    debug(err);
    res.status(500).send('Internal server error');
}