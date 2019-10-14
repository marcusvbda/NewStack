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
    if(origin==process.env.URL_FRONTEND) return callback(null, true)
    return  callback(new Error('Not allowed by cors'))
  },
  credentials: true
}))

app.use('/protection', require('./routes/protection'))
app.use('/auth', require('./routes/auth'))
app.use('/debug', require('./routes/debug'))
app.use('/account', require('./routes/account'))

const port = process.env.SERVER_PORT

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
