const { Schema, model } = require('mongoose')

const schema = new Schema({
    index: {
        type: String,
        required: true
    }
},{
    timestamps: true
})


module.exports = model('settings', schema)