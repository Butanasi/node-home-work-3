const express = require('express')
const { registration, login, logout, reVerify, verifyUser } = require('../../../controllers/auth')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const guard = require('../../../middlewares/guard')
const router = express.Router()

router.post('/signup', wrapperError(registration))
router.post('/login', wrapperError(login))
router.post('/logout', guard, wrapperError(logout))
router.get('/verify/:token', wrapperError(verifyUser))
router.post('/veryfy', wrapperError(reVerify))

module.exports = router
