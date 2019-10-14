var express = require('express')
var router = express.Router()

var csrfProtection = require(__dirname+"/../middleware/csrfProtection")

router.get('/csrf_token',[csrfProtection], (req, res) => {
    let token = req.csrfToken()
    return res.json({ csrfToken: token })
})

module.exports = router