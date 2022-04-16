const express = require('express')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const { currentUser } = require('../../../controllers/user')
const auth = require('../../../middlewares/auth')
const router = express.Router()

router.get('/current', auth, wrapperError(currentUser))

module.exports = router
