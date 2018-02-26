const mongoose = require('mongoose');
const Joi = require('joi');

const Item = mongoose.model('Item', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    headline: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minlength: 3
    },
    category: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    creator: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    img: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 255
    }
}));

function validateItem(item) {
    const schema = {
        name: Joi.string().min(3).max(50).required(),
        headline: Joi.string().min(3).max(50).required(),
        description: Joi.string().min(3).max(255).required(),
        category: Joi.string().min(3).max(20).required(),
        creator: Joi.string().min(3).max(50).required(),
        img: Joi.string().min(3).max(255).required()
    }
    return Joi.validate(item, schema);
}

module.exports.Item = Item;
module.exports.validate = validateItem;
