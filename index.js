const startupDebugger = require('debug')('app:startup');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const items = require('./routes/items');
const app = express();

app.use(helmet());

const port = process.env.PORT || 4741;

mongoose.connect('mongodb://localhost/srcollections-development')
    .then(() => startupDebugger('connected to mongodb...'))
    .catch(err => console.log('Could not connect to mongo db', err));


app.use(express.json( { type: 'application/json' }));
app.use(express.urlencoded({ extended: false }));


app.use('/api/items', items);


app.listen(port, () => {
    startupDebugger(`Listening on port ${port}...`);
});