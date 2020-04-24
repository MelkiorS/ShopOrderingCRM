const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/category')
const router = express.Router()
const authenticateAs = require('../config/keys').authenticateAs

router.get('/', passport.authenticate(authStrategy, {session: false}), controller.getAll)
router.get('/:id', passport.authenticate(authStrategy, {session: false}), controller.getById)
router.delete('/:id', passport.authenticate(authStrategy, {session: false}), controller.remove)
router.post('/', passport.authenticate(authStrategy, {session: false}), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate(authStrategy, {session: false}), upload.single('image'), controller.update)


module.exports = router