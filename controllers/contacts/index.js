const { HTTP_STATUS_CODES } = require('../../libs/constants')
const contactsService = require('../../services/contacts')

const getContacts = async (req, res) => {
	const contacts = await contactsService.getAll(req.query, req.user)
	res.json({
		status: 'success',
		code: HTTP_STATUS_CODES.OK,
		payload: { ...contacts }
	})
}

const getContactById = async (req, res) => {
	const contact = await contactsService.getByid(
		req.params.contactId,
		req.user
	)
	res.json({
		status: 'success',
		code: HTTP_STATUS_CODES.OK,
		payload: { contact }
	})
}

const createContact = async (req, res) => {
	const contact = await contactsService.create(req.body, req.user)
	res.status(HTTP_STATUS_CODES.CREATED).json({
		status: 'success',
		code: HTTP_STATUS_CODES.CREATED,
		payload: { contact }
	})
}

const deleteContact = async (req, res) => {
	const contact = await contactsService.delete(req.params.contactId, req.user)

	res.json({
		status: 'success',
		code: HTTP_STATUS_CODES.NO_CONTENT,
		payload: { message: 'Contact deleted' }
	})
}

const updateContact = async (req, res) => {
	const contact = await contactsService.update(
		req.params.contactId,
		req.body,
		req.user
	)
	res.json({
		status: 'success',
		code: HTTP_STATUS_CODES.OK,
		payload: { contact }
	})
}

const updateFavorite = async (req, res, next) => {
	const contact = await contactsService.updateFavorite(
		req.params.contactId,
		req.body,
		req.user
	)
	res.json({
		status: 'success',
		code: HTTP_STATUS_CODES.OK,
		payload: { contact }
	})
}

module.exports = {
	getContacts,
	getContactById,
	createContact,
	deleteContact,
	updateContact,
	updateFavorite
}
