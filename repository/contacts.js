const Contact = require('../models/contact')

const getContacts = async (query, user) => {
	const result = await Contact.find({ owner: user.id })
	return result
}

const getContactById = async (contactId, user) => {
	const result = await Contact.findOne({ _id: contactId, owner: user.id })
	return result
}

const createContact = async (body, user) => {
	const result = await Contact.create({ ...body, owner: user.id })
	return result
}

const updateContact = async (contactId, body, user) => {
	const result = await Contact.findOneAndUpdate(
		{ _id: contactId, owner: user.id },
		{ ...body },
		{ new: true }
	)
	return result
}

const deleteContact = async (contactId, user) => {
	const result = await Contact.findOneAndRemove({
		_id: contactId,
		owner: user.id
	})
	return result
}

const updateFavorite = async (contactId, body, user) => {
	const result = await Contact.findOneAndUpdate(
		{ _id: contactId, owner: user.id },
		{ ...body },
		{ new: true }
	)
	return result
}

module.exports = {
	getContacts,
	getContactById,
	createContact,
	updateContact,
	deleteContact,
	updateFavorite
}
