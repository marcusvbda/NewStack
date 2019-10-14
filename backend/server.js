var express = require('express')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')
require('dotenv').config()

var app = express()

app.use(bodyParser.json())

mongoose.connect(process.env.DB_SERVER, {
  useNewUrlParser: true,
  useUnifiedTopology:true
})

app.use(cookieParser())

app.use(cors({
  origin: (origin, callback) => {
    console.log(origin)
    let cors_white_list = process.env.CORS_WHITE_LIST.split(",")
    if (cors_white_list.indexOf(origin) !== -1 ) return callback(null, true)
    return  callback(new Error('Not allowed by CORS'))
  },
  credentials: true
}))

app.use('/protection', require('./routes/protection'))
app.use('/auth', require('./routes/auth'))
app.use('/debug', require('./routes/debug'))
app.use('/account', require('./routes/account'))
app.use('/uploads', require('./routes/uploads'))

const port = process.env.SERVER_PORT

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
