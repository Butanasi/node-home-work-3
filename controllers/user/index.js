const { HTTP_STATUS_CODES } = require('../../libs/constants')
const AvatarService = require('../../services/file')
const LocalStorage = require('../../services/file/localStorage')


const currentUser = async (req, res) => {
	const { email, subscription } = req.user
	res.json({
		status: 'success',
		code: HTTP_STATUS_CODES.OK,
		data: {
			email,
			subscription
		}
	})
}

const avatarUser = async (req, res) => {
	const avatarService = new AvatarService(LocalStorage, req.file, req.user)
	const urlOfAvatar = await avatarService.updateAvatar()
	res.json({
		status: 'success',
		code: HTTP_STATUS_CODES.OK,
		payload: { avatar: urlOfAvatar }
	})
}

module.exports = { currentUser, avatarUser }
