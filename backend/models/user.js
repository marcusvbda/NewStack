const { Schema, model } = require('mongoose')

const schema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    username: {
        type: String,
        required: true,
        createIndexes: { unique: true }
    },
    password: {
        type: String,
        required: true,
        safe : true
    },
    recoverytoken: {
        type: String
    },
    confirmtoken: {
        type: String
    },
    email: {
        type: String,
        required: true,
        createIndexes: { unique: true }
    },
    confirmed: {
        type: Boolean,
        required: true,
        default : false
    },
    provider: {
        type: String,
    },
    provider_id: {
        type: String,
    },
    phone: {
        type: String
    },
},{
    timestamps: true
})

module.exports = model('users', schema)