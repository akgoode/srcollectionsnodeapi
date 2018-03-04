require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: process.env.MONGODB_URI || 'mongodb://localhost/srcollections-development',
    level: 'error'
});