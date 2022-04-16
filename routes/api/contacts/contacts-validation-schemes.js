const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const numberPattern =
	/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
const namePattern = /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/

const schemaCreateContact = Joi.object({
	// Схема для проверки при создании контакта
	name: Joi.string().pattern(namePattern).min(3).max(30).required(),

	phone: Joi.string().pattern(numberPattern).required(),

	email: Joi.string().pattern(emailPattern),

	favorite: Joi.boolean()
})

const schemaUpdateContact = Joi.object({
	// Схема для проверки при обновлении контакта
	name: Joi.string().pattern(namePattern).min(3).max(30),

	phone: Joi.string().pattern(numberPattern),

	email: Joi.string().pattern(emailPattern),

	favorite: Joi.boolean()
})

const schemaMongoId = Joi.object({
	// Схема для проверки при получении контакта по id
	contactId: Joi.objectId().required()
})

const schemaFavorite = Joi.object({
	// Схема для проверки при получении контакта по favorite
	favorite: Joi.boolean().required()
}).messages({ message: 'missing field favorite' })

module.exports = {
	schemaCreateContact,
	schemaUpdateContact,
	schemaMongoId,
	schemaFavorite
}
