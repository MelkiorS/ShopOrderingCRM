const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const moment = require('moment')
const User = require('../modelsDB/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
  const candidate = await User.findOne({nickname: req.body.nickname})

  if (candidate) {
    const isRightPassword = bcrypt.compareSync(req.body.password, candidate.password)
    if (isRightPassword) {
      const oneHour = moment({hour: 1}).second();
      const token = jwt.sign({
        nickname: candidate.nickname,
        userId: candidate._id
      }, keys.jwt, {expiresIn: oneHour})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Not found user with this name or password\''
      })
    }
  } else {
    res.status(401).json({
      message: 'Not found user with this name or password'
    })
  }
}


module.exports.register = async function(req, res) {
  const candidate = await User.findOne({email: req.body.email.trim})

  if (candidate) {
    res.status(409).json({
    message: 'This email is already taken'
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const securedPassword = bcrypt.hashSync(password, salt)
    const user = new User({
      email: req.body.email,
      password: securedPassword
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch(e) {
      errorHandler(res, e)
    }

  }
}