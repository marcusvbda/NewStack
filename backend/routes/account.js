var express = require('express')
var router = express.Router()

var csrfProtection = require(__dirname + "/../middleware/csrfProtection")
const accountController = require(__dirname + "/../controllers/accountController")

router.post('/get_data', [csrfProtection], accountController.getData)
router.put('/put_data', [csrfProtection], accountController.putData)

module.exports = router