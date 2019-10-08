const nodemailer = require('nodemailer')

const _this = {
    send : async(param = {},callback = null) => {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_SERVER,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SSL, 
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        })
    
        const mailOptions = {
            to: param.to,
            subject: param.subject,
            html : param.html
        }
    
        transporter.sendMail(mailOptions,callback)
    }
}
module.exports = _this