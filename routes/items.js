const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const debug = require('debug')('app:item');
const { Item, validate } = require('../models/item');
const express = require('express');
const router = express.Router();

router.post('/', [ auth, admin ], async function (req, res){

    const token = req.header('x-auth-token');
    const { error } = validate(req.body);
    if (error) return res.status(400).send(JSON.stringify(error.details, 2, 2));

    let item = new Item(req.body);
    item = await item.save();
    res.status(201).send(item);
    debug('Created new Item!');
});

router.get('/', async (req, res) => {
    const items = await Item.find();
    res.send(items);
    debug('Got all items!');
});

router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.send(item);
    debug(`Got item ${req.params.id}`);
});

router.put('/:id', [ auth, admin ], async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const item = await Item.findById(req.params.id);
    item.set(req.body);
    let result = await item.save();
    res.status(200).send(result);
    debug(`Updated Item ${req.params.id}`);
});

router.delete('/:id', [ auth, admin ], async (req, res) => {
    const item = await Item.findByIdAndRemove(req.params.id);
    res.send(item);
    debug(`Deleted item ${req.params.id}`);
});

module.exports = router;