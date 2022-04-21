const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const { HTTP_STATUS_CODES } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')
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
		return {
			id: newUser.id,
			email: newUser.email,
			subscription: newUser.subscription,
			avatarUrl: newUser.avatarUrl
		}
	}

	async login({ email, password }) {
		const user = await this.#getUser(email, password)
		if (!user) {
			throw new CustomError(
				'Invalid credentials',
				HTTP_STATUS_CODES.UNAUTHORIZED
			)
		}
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
			return null
		}

		if (!(await user?.isValidPassword(password))) {
			return null
		}

		return user
	}

	#generateToken(user) {
		const payload = { id: user.id }
		const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })

		return token
	}
}

module.exports = new AuthService()
