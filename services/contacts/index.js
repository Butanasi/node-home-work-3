const contactRepository = require('../../repository/contacts')
const { HTTP_STATUS_CODES } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')

class ContactsService {
	async getAll(query, user) {
		const contacts = await contactRepository.getContacts(query, user)
		return contacts
	}

	async getByid(id, user) {
		const contact = await contactRepository.getContactById(id, user)
		if (!contact) {
			throw new CustomError(
				HTTP_STATUS_CODES.NOT_FOUND,
				'Contact not found'
			)
		}
		return contact
	}

	async create(body, user) {
		const contact = await contactRepository.createContact(body, user)
		return contact
	}

	async delete(id, user) {
		const contact = await contactRepository.deleteContact(id, user)
		if (!contact) {
			throw new CustomError(
				HTTP_STATUS_CODES.NOT_FOUND,
				'Contact not found'
			)
		}
		return contact
	}

	async update(id, body, user) {
		const contact = await contactRepository.updateContact(id, body, user)
		if (!contact) {
			throw new CustomError(
				HTTP_STATUS_CODES.NOT_FOUND,
				'Contact not found'
			)
		}
		return contact
	}

	async updateFavorite(id, body, user) {
		const contact = await contactRepository.updateFavorite(id, body, user)
		if (!contact) {
			throw new CustomError(
				HTTP_STATUS_CODES.NOT_FOUND,
				'Contact not found'
			)
		}
		return contact
	}
}

module.exports = new ContactsService()
