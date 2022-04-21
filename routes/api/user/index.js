const express = require('express')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const { currentUser, avatarUser } = require('../../../controllers/user')
const guard = require('../../../middlewares/guard')
const upload = require('../../../middlewares/upload')
const auth = require('../../../middlewares/auth')
const router = express.Router()

router.get('/current', auth, wrapperError(currentUser))
router.patch('/avatar', guard, upload.single('avatar'), wrapperError(avatarUser))

module.exports = router
