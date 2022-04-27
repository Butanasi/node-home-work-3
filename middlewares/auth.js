const jwt = require('jsonwebtoken')
const User = require('../models/user')
const CustomError = require('./error-handler')
const { HTTP_STATUS_CODES } = require('../libs/constants')
const SECRET_KEY = process.env.JWT_SECRET_KEY

const auth = async (req, res, next) => {
	const { authorization = '' } = req.headers
	const [bearer, token] = authorization.split(' ')

	try {
		if (bearer !== 'Bearer') {
			throw new CustomError(
				'Not authorized',
				HTTP_STATUS_CODES.UNAUTHORIZED
			)
		}
		const { id } = jwt.verify(token, SECRET_KEY)
		const user = await User.findById(id)
		if (!user) {
			throw new CustomError(
				'Not authorized',
				HTTP_STATUS_CODES.UNAUTHORIZED
			)
		}
		req.user = user
		next()
	} catch (error) {
		if ((error.message = 'invalid signature')) {
			error.status = HTTP_STATUS_CODES.UNAUTHORIZED
		}
		throw error
	}
}

module.exports = auth
