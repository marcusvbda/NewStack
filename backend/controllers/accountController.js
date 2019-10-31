const accountController = function() {
    this.user_model = require("../models/user")
    this.crypto     = require('crypto')
    
    this.getData = async(req, res)  => {
        try {
            let id = req.body.user._id
            let user = await this.user_model.findOne({_id:id})
            if(!user) return res.json({success : false, message : {content : "User not found",type : "error" }, data : null})
            let _user = {
                _id : user._id,
                fullname  : user.fullname,
                provider  : user.provider,
                firstname : user.firstname,
                lastname  : user.lastname,
                email     : user.email,
                phone     : user.phone,
                avatar    : user.avatar,
                username  : user.username,
                settings  : await user.settings
            }
            return res.json({success : true, data : _user })
        } catch(error) {
            return res.json({success : false , message : {content : error.message, type:"error"} , data : null })
        }
    }

    this.putData = async(req, res)  => {
        try {
            let data = req.body
            let user = await this.user_model.findOne({_id:data._id})
            if(!user) return res.json({success : false, message : {content : "Username not found" ,type : "error" }, data : null})
            for(let i in data["values"]) {
                let values = data["values"][i]
                for(let index in values) {
                    user[index] = values[index]
                }
            }
            await user.save()
            return res.json({success : true})
        } catch(error) {
            return res.json({success : false , message : {content : error.message, type:"error"} , data : null })
        }
    }
}

module.exports = new accountController()