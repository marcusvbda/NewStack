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
            user.firstname = data.firstname
            user.lastname  = data.lastname
            user.avatar    = data.avatar
            if(data.password) user.password = this.crypto.createHash('md5').update(data.password).digest("hex") 
            await user.save()
            return res.json({success : true, data : user,message : {content : "Data edited successfully", type : "success" } })
        } catch(error) {
            return res.json({success : false , message : {content : error.message, type:"error"} , data : null })
        }
    }
}

module.exports = new accountController()