const mongoose = require('mongoose')
const {
   Schema
} = mongoose

const schema = new Schema({
   example: {
      type: String,
      default: 'This is the default schema'
   }
}, {
   timestamps: false
})

const name = 'example'
module.exports = mongoose.models[name] || mongoose.model(name, schema)
