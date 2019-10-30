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
    user_settings: {
        type: Array,
        default : []
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

schema.virtual('fullname').get(function() {  
    return this.firstname + ' ' + this.lastname
})

const model_settings = require("./settings")

schema.virtual('settings').get(async function() {  
    let all_settings = await model_settings.find({})
    let settings = []
    for(let i in all_settings) {
        let local_settings = await this.user_settings.find(x => x._id == all_settings[i]._id)
        settings.push({_id : all_settings[i]._id, index : all_settings[i].index, value : local_settings ? true : false})
    }
    return settings
})

module.exports = model('users', schema)