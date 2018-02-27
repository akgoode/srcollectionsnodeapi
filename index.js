const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logs');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const port = process.env.PORT || 4741;

app.listen(port, () => {
    winston.info(`Listening on port ${port}...`);
});