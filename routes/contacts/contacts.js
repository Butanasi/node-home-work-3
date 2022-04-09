const express = require('express');
const {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateFavorite
} = require('../../controllers/contacts');
const {
    schemaCreateContact,
    schemaUpdateContact,
    schemaMongoId,
    schemaFavorite
} = require('./contacts-validation-schemes')
const { validateBody, validateParams } = require('../../middlewares/validation')
const router = express.Router();


router.get('/', getContacts);

router.get('/:contactId', validateParams(schemaMongoId), getContactById);

router.post('/', validateBody(schemaCreateContact), createContact);

router.delete('/:contactId', validateParams(schemaMongoId), deleteContact);

router.put('/:contactId', validateParams(schemaMongoId), updateContact);

router.patch(
    '/:contactId/favorite',
    validateParams(schemaMongoId),
    validateBody(schemaFavorite),
    updateFavorite
);

module.exports = router;