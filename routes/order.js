const express = require('express')
const passport = require('passport')
const controller = require('../controllers/order')
const router = express.Router()
const authenticateAs = require('../config/keys').authenticateAs

router.get('/', passport.authenticate(authenticateAs, {session: false}), controller.getAll)
router.post('/', passport.authenticate(authenticateAs, {session: false}), controller.create)


module.exports = router