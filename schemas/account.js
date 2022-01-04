const mongoose = require('mongoose')

const account = new mongoose.Schema({
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
})

module.exports = mongoose.model('account', account)