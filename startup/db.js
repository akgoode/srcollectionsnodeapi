const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.connect('mongodb://localhost/srcollections-development')
    .then(() => winston.info('connected to mongodb...'));
}