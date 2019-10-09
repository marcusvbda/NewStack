const user_model = require("../models/user")
var crypto = require('crypto')

const _this = {
    getData : async(req, res)  => {
        try {
            let id = req.body.user._id
            let user = await user_model.findOne({_id:id})
            if(!user) return res.json({success : false, message : {content : "User not found",type : "error" }, data : null})
            let _user = {
                _id : user._id,
                provider  : user.provider,
                firstname : user.firstname,
                lastname  : user.lastname
            }
            return res.json({success : true, data : _user })
        } catch(error) {
            return res.json({success : false , message : {content : error.message, type:"error"} , data : null })
        }
    },
    putData : async(req, res)  => {
        try {
            let data = req.body
            let user = await user_model.findOne({_id:data._id})
            if(!user) return res.json({success : false, message : {content : "Username not found" ,type : "error" }, data : null})
            user.firstname = data.firstname
            user.lastname = data.lastname
            if(data.password) user.password = crypto.createHash('md5').update(data.password).digest("hex") 
            await user.save()
            return res.json({success : true, data : user,message : {content : "Data edited successfully", type : "success" } })
        } catch(error) {
            return res.json({success : false , message : {content : error.message, type:"error"} , data : null })
        }
    },
}


module.exports  = _this