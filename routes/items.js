const itemDebugger = require('debug')('app:item');
const { Item, validate } = require('../models/item');
const express = require('express');
const router = express.Router();

router.post('/', async function (req, res){
    const { error } = validate(req.body);
    if (error) res.status(400).send(JSON.stringify(error.details, 2, 2));

    let item = new Item(req.body);
    item = await item.save();
    res.status(201).send(item);
    itemDebugger('Created new Item!');
});

router.get('/', async (req, res) => {
    const items = await Item.find();
    res.send(items);
    itemDebugger('Got all items!');
});

router.get('/:id', async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.send(item);
    itemDebugger(`Got item ${req.params.id}`);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if(error) res.status(400).send(error.details[0].message);
    const item = await Item.findById(req.params.id);
    item.set(req.body);
    let result = await item.save();
    res.status(200).send(result);
    itemDebugger(`Updated Item ${req.params.id}`);
});

router.delete('/:id', async (req, res) => {
    const item = await Item.findByIdAndRemove(req.params.id);
    res.send(item);
    itemDebugger(`Deleted item ${req.params.id}`);
});

module.exports = router;