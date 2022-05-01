const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const { HTTP_STATUS_CODES } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')
const MailService = require('../email/service')
const SenderNodemailer = require('../email/senders/nodemailer')
const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
	async create(body) {
		const user = await Users.findByEmail(body.email)
		if (user) {
			throw new CustomError(
				'User already exists',
				HTTP_STATUS_CODES.CONFLICT
			)
		}
		const newUser = await Users.create(body)
		const sender = new SenderNodemailer()
		const mailService = new MailService(sender)
		try {
			await mailService.sendMail(
				newUser.email,
				newUser.name,
				newUser.verifyKey
			)
		} catch (error) {
			console.log(error);
		}
		return {
			id: newUser.id,
			email: newUser.email,
			subscription: newUser.subscription,
			avatarUrl: newUser.avatarUrl
		}
	}

	async login({ email, password }) {
		const user = await this.#getUser(email, password)
		const token = this.#generateToken(user)
		await Users.updateToken(user.id, token)
		return { token }
	}

	async logout(id) {
		await Users.updateToken(id, null)
	}

	async currentUser(token) {
		const user = await Users.findByToken(token)
		if (!user) {
			throw new CustomError(
				'Invalid token',
				HTTP_STATUS_CODES.UNAUTHORIZED
			)
		}
		return {
			email: user.email,
			subscription: user.subscription
		}
	}

	async #getUser(email, password) {
		const user = await Users.findByEmail(email)

		if (!user) {
			throw new CustomError(
				'User not found',
				HTTP_STATUS_CODES.NOT_FOUND
			)
		}

		if (!(await user?.isValidPassword(password))) {
			throw new CustomError(
				'Invalid credentials',
				HTTP_STATUS_CODES.UNAUTHORIZED
			)
		}
		if (!user?.isVerify) {
			throw new CustomError(
				'User not verified',
				HTTP_STATUS_CODES.BAD_REQUEST
			)
		}
		return user
	}

	#generateToken(user) {
		const payload = { id: user.id }
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })

		return token
	}

	async verifyUser(token) {
		const user = await Users.findByVerifyKey(token)
		if (!user) {
			throw new CustomError(
				'Invalid token',
				HTTP_STATUS_CODES.BAD_REQUEST
			)
		}
		if (user && user.isVerify) {
			throw new CustomError(
				'User already verified',
				HTTP_STATUS_CODES.BAD_REQUEST
			)
		}
		await Users.verifyUser(user.id)
		return user
	}

	async reVerify(email) {
		const user = await Users.findByEmail(email)
		if (!user) {
			throw new CustomError(
				'User not found',
				HTTP_STATUS_CODES.NOT_FOUND
			)
		}
		if (user && user.isVerify) {
			throw new CustomError(
				'User already verified',
				HTTP_STATUS_CODES.BAD_REQUEST
			)
		}
		const sender = new SenderNodemailer()
		const mailService = new MailService(sender)
		try {
			await mailService.sendMail(user.email, user.name, user.verifyKey)
		} catch (error) {
			throw new CustomError(
				'Error sending email',
				HTTP_STATUS_CODES.SERVICE_UNAVAILABLE
			)
		}

	}
}

module.exports = new AuthService()
