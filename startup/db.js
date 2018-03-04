const winston = require('winston');
const mongoose = require('mongoose');

const db = process.env.MONGODB_URI || 'mongodb://localhost/srcollections-development';

module.exports = function () {
    mongoose.connect(db)
    .then(() => winston.info('connected to mongodb...'));
}