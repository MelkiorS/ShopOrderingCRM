const express = require('express')
const passport = require('passport')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const authRoutes = require('./routes/auth')
const positionRoutes = require('./routes/position')
const categoryRoutes = require('./routes/category')
const orderRoutes = require('./routes/order')
const mongoURL = require('./config/keys').mongoURL
const devLogs = require('morgan')('dev')
const app = express()

mongoose.connect(mongoURL,
    { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex : true })
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(`MongoDB connection problem ${error}`))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(devLogs)
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('cors')())

//----------routes---------------
app.use('/api/auth', authRoutes)
app.use('/api/position', positionRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/order', orderRoutes)
//--------------------------------

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