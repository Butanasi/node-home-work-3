const User = require('../models/user')

const findByEmail = async email => {
	return await User.findOne({ email })
}

const findById = async id => {
	return await User.findById(id)
}

const create = async body => {
	const user = await User(body)
	return await user.save()
}

const updateToken = async (id, token) => {
	return await User.findByIdAndUpdate(id, { token })
}

const findByToken = async token => {
	return await User.findOne({ token })
}

const updateAvatar = async (id, avatar) => {
	return await User.findByIdAndUpdate(id, { avatar })
}

module.exports = { findByEmail, findById, create, updateToken, findByToken, updateAvatar }
