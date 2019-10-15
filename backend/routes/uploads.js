const express = require('express')
const multer  = require('multer')
const router  = express.Router()
const temp_path = './temp'
const imgur = require('imgur')
const fs = require('fs')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, temp_path)
    },
    filename: function (req, file, cb) {
        let extension = file.originalname.split('.')
        cb(null, `${Date.now() }.${extension[1]}`)
    }
})

const upload = multer({ storage: storage })

router.post('/image',upload.single('file'),async (req, res) => {
    let file = req.file
    let path = `${temp_path}/${file.filename}`
    await imgur.uploadFile(path).then( json => {
        fs.unlinkSync(path)
        return res.json({file : json.data.link})
    })
})


module.exports = router;