var express = require('express')
var router = express.Router()
var csrfProtection = require(__dirname+"/../middleware/csrfProtection")
const authController = require(__dirname+"/../controllers/authController")

router.post('/login',[csrfProtection], authController.login)
router.post('/signup',[csrfProtection], authController.signup)
router.post('/confirm_user',[csrfProtection],authController.confirm_user)
router.post('/recovery',[csrfProtection],authController.recovery)
router.post('/check_user_renew',[csrfProtection],authController.check_user_renew)
router.post('/renew_password',[csrfProtection],authController.renew_password)

module.exports = router