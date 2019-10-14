const express = require('express')
const multer  = require("multer")
const router  = express.Router()
const path = require("path")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split(".")
        cb(null, `${Date.now() }.${extension[1]}`)
    }
})

const upload = multer({ storage: storage })

router.post('/',upload.single('file'),(req, res) => {
    res.json({file : req.file})
})

router.get('/:image',(req, res) => {
    res.sendFile(path.join(__dirname, `../uploads/${req.params.image}`))
})

module.exports = router;