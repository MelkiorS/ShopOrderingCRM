const mongoose = require('mongoose')
const Schema = mongoose.Schema

const schema = new Schema({
  nickname: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('users', schema)