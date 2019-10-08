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
  origin: (origin, callback) => callback(null, true),
  credentials: true
}))

app.use('/template', require('./routes/template'))
app.use('/auth', require('./routes/auth'))
app.use('/debug', require('./routes/debug'))

const port = process.env.SERVER_PORT
app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
