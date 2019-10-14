const express = require('express')
const router = express.Router()

const csrfProtection = require(__dirname+"/../middleware/csrfProtection")

router.get('/csrf_token',[csrfProtection], (req, res) => {
    let token = req.csrfToken()
    return res.json({ csrfToken: token })
})

module.exports = router