const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwt = require('../config/keys').jwt
const mongoose = require('mongoose')
const User = mongoose.model('users')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwt
}

module.exports = passport => {
  passport.use(
    new JwtStrategy(options, async (payload, done) => {
      try {
          const user = await User.findById(payload.userId).select('nickname id')
          user ? done(null,user) : done(null,false)
      } catch (e) {
        console.log(e)
      }
    })
  )
}