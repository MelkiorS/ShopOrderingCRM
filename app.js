const express = require('express')
const passport = require('passport')
const bodyParser = require('body-parser')
const path = require('path')
const authRoutes = require('./routes/auth')
const keys = require('./config/keys')
const devLogs = require('morgan')('dev')
const app = express()

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(devLogs)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

app.use('/api/auth', authRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'))
  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(
        __dirname, 'client', 'dist', 'client', 'index.html'
      )
    )
  })
}


module.exports = app