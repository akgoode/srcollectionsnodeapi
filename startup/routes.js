const items = require('../routes/items');
const users = require('../routes/users');
const auth = require('../routes/auth');
const error = require('../middleware/error');
const helmet = require('helmet');
const express = require('express');
const cors = require('cors');

module.exports = function (app) {
    app.use(cors());
    app.use(helmet());
    app.use(express.json( { type: 'application/json' }));
    app.use(express.urlencoded({ extended: false }));
    app.use('/api/users', users);
    app.use('/api/items', items);
    app.use('/api/auth', auth);
    app.use(error);
}