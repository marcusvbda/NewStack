const user_model = require("../models/user")
var crypto = require('crypto')
const Mailer = require("../helpers/Mailer")

const _this = {
    login : async(req, res)  => {
        try {
            let username = req.body.username
            let checked_username = await _this.checkUsername(username,req.body.provider ? req.body.provider : null)
            if(req.body.provider&&req.body.provider_id) {
                let result = await _this.enterProvider(req)
                return res.json(result)
            } 
            if(!checked_username.length) return res.json({success : false, message : {content : "Username not found",type : "error" }, data : null})
            let user = checked_username.find( x => x.password == crypto.createHash('md5').update(req.body.password).digest("hex") )
            if(!user) return res.json({success : false, message : {content : "The Password is wrong",type : "error" }, data : null})
            if(!user.confirmed) return res.json({success : false, message : {content : "Account not verified, check  your inbox and confirm",type : "error" }, data : null})
            return res.json({success : true, message : {content : "Welcome %%",type : "success", params : [user.firstname+" "+user.lastname] }, data : _this.makeReturnUserToFrontEnd(user) })
        } catch(error) {
            return res.json({success : false , message : {content : error.message, type:"error"} , data : null })
        }
    },
    enterProvider : async(req) => {
        let names        = req.body.username.split(" ")
        let firstname    = names[0]
        name = names.splice(0,1)
        let lastname     = names.join(" ")
        let provider     = req.body.provider
        let provider_id  = req.body.provider_id
        let email        = `${provider_id}@${provider}`
        let password     = crypto.createHash('md5').update(provider_id).digest("hex")
        let user = await user_model.findOne({provider : provider, provider_id : provider_id,username: provider_id, password : password})
        if(!user) {
            user = await _this.createUser({
                confirmed   : true,
                provider    : provider,
                provider_id : provider_id,
                username    : provider_id,
                password    : provider_id, //method make the hash
                firstname   : firstname,
                lastname    : lastname,
                email       : email,
            })
            user = await user.save()
        }
        return {success : true, message : {content : "Welcome %%",type : "success", params : [user.firstname+" "+user.lastname] }, data : _this.makeReturnUserToFrontEnd(user) }
    },
    makeReturnUserToFrontEnd(user) {
        return {
            _id       : user._id, 
            firstname : user.firstname, 
            lastname  : user.lastname,
            email     : user.email,
            username  : user.username
        }
    },
    createUser : async(data) => {
        delete data.confirm
        delete data.retype_password
        data.password = crypto.createHash('md5').update(data.password).digest("hex")
        let user = new user_model(data)
        return user
    },
    checkUsername : async(username,provider) => {
        let user = await user_model.find({username : username, provider : provider})
        if(user.length) return user
        user = await user_model.find({email : username})
        if(user.length) return user
        return false
    },
    signup : async(req, res)  => {
        try {
            let data = req.body
            let user = await user_model.find({username : data.user})
            if(user.length) return res.json({success : false, message : {content : "This username is already in use", type : "error" }, data : null})
            user = await user_model.find({email : data.email})
            if(user.length) return res.json({success : false, message : {content : "This email is already in use", type : "error"}, data : null})
            user = await _this.createUser(data)
            await _this.sendConfirmationEmail(user, async(error) => {
                if(error) return res.json({ success:false, message:{content:error.message,type:'error'}, data:null })
                user = await user.save()
                return res.json({ success:true, message:{content:'User created succesfully, check your email and confirm it to access',type:'success'}, data:user })
            })
        } catch(error) {
            return res.json({success : false , message : {content : error.message, type:"error"} , data : null })
        }
    },
    makeToken : (user) => crypto.createHash('md5').update(user._id+"_"+user.created_at).digest("hex"),
    sendConfirmationEmail : async(user,callback) => {
        user.confirmtoken = _this.makeToken(user)
        user.save()
        let link = `${process.env.URL_FRONTEND}/account_confirm/${user.confirmtoken}`
        let html = `
            <p>Hello ${user.username},</p>
            <p>Thank you for sign up. Your account has been created and it is pending verification.</p>
            <p>To activate it, please click in the link below</p>
            <a href="${link}" target="_BLANK">${link}</a>
            <p style="margin-top:30px">Thank you, ${process.env.APP_NAME}
        `
        await Mailer.send({subject:"Confirm your account", to:user.email,html:html},callback)
    },
    confirm_user : async(req, res) => {
        let token = req.body.token
        if(!token) return res.status(404).json()
        let user = await user_model.findOne({confirmtoken : token, confirmed : false})
        if(!user) return res.status(404).json()
        user.confirmed = true
        user.confirmtoken = undefined
        user.save()
        return res.json({ username : user.username })
    },
    recovery  : async(req, res) => {
        let body = req.body
        let user = await user_model.findOne({email : body.email})
        if(!user) return res.json({success : false, message : {content : "Username not found",type : "error" }, data : null})
        await _this.sendRecoveryEmail(user, async(error) => {
            if(error) return res.json({ success:false, message:{content:error.message,type:'error'}, data:null })
            user = await user.save()
            return res.json({ success:true, message:{content:'An email has been sent, check your inbox',type:'success'}, data:user })
        })
    },
    check_user_renew : async(req, res) => {
        let token = req.body.token
        let user = await user_model.findOne({recoverytoken : token})
        if(!user) return res.status(404).json()
        return res.json(user)
    },
    sendRecoveryEmail : async(user,callback) => {
        user.recoverytoken = _this.makeToken(user)
        user.save()
        let link = `${process.env.URL_FRONTEND}/account_recovery/${user.recoverytoken}`
        let html = `
            <p>Hello ${user.username},</p>
            <p>Forgot your password ? No problem! </p>
            <pClick the link below to register a new password.</p>
            <a href="${link}" target="_BLANK">${link}</a>
            <p style="margin-top:30px">Thank you, ${process.env.APP_NAME}
        `
        await Mailer.send({subject:"Renew your password", to:user.email,html:html},callback)
    },
    renew_password : async(req, res) => {
        let token = req.body.token
        if(!token) return res.status(404).json()
        let user = await user_model.findOne({recoverytoken : token})
        if(!user) return res.status(404).json()
        user.recoverytoken = undefined
        user.password = crypto.createHash('md5').update(req.body.password).digest("hex")
        user.save()
        return res.json({success : true , message : {content : "Your password has been changed", type : "success" }, data : { username : user.username }})
    }
}


module.exports  = _this