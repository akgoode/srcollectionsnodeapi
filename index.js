require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const error = require('./middleware/error');
const config = require('config');
const debug = require('debug')('app:startup');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const items = require('./routes/items');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

process.on('uncaughtException', (ex) => {
    debug('Uncaught exception.');
    winston.error(ex.message, ex);
});

winston.add(winston.transports.File, { filename: 'logfile.log' });
winston.add(winston.transports.MongoDB, { 
    db: 'mongodb://localhost/srcollections-development',
    level: 'error'
});

if(!config.get('jwtPrivateKey')) {
    debug('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

const port = process.env.PORT || 4741;

mongoose.connect('mongodb://localhost/srcollections-development')
    .then(() => debug('connected to mongodb...'))
    .catch(err => console.log('Could not connect to mongo db', err));

app.use(helmet());
app.use(express.json( { type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', users);
app.use('/api/items', items);
app.use('/api/auth', auth);

app.use(error);

app.listen(port, () => {
    debug(`Listening on port ${port}...`);
});