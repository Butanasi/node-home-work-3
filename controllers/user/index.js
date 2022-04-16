const { HTTP_STATUS_CODES } = require('../../libs/constants')

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

module.exports = { currentUser }
