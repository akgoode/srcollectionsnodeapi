const _ = require('lodash');
const debug = require('debug')('app:user');
const { User, validate } = require('../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(JSON.stringify(error.details, 2, 2));

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user = await user.save();
    res.status(201).send(_.pick(user, ['_id', 'name', 'email']));
    debug('Created new User!');
});

module.exports = router;