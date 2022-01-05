const { Schema, model } = require("mongoose");

module.exports = model('account', new Schema({
        user_id: {
            type: String,
            default: "0",
            required: true
        },
        neothereum: {
            type: Number,
            default: 0,
            required: true
        }
    },{
        collection: "neothereum"
    })
);