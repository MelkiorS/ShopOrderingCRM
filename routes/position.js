const express = require('express')
const passport = require('passport')
const authenticateAs = require('../config/keys').authenticateAs
const controller = require('../controllers/position')
const router = express.Router()

router.get('/:categoryId', passport.authenticate(authenticateAs, {session: false}), controller.getByCategoryId)
router.post('/', passport.authenticate(authenticateAs, {session: false}), controller.create)
router.patch('/:id', passport.authenticate(authenticateAs, {session: false}), controller.update)
router.delete('/:id', passport.authenticate(authenticateAs, {session: false}), controller.remove)


module.exports = router