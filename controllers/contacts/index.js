const contactRepository = require('../../repository/contacts');
const HTTP_STATUS_CODES = require('../../libs/constants');

const getContacts = async(req, res, next) => {
    const contacts = await contactRepository.getContacts();
    res.json({ status: 'success', code: HTTP_STATUS_CODES.OK, payload: { contacts } });
}

const getContactById = async(req, res, next) => {
    const contact = await contactRepository.getContactById(req.params.contactId);
    if (contact) {
        res.json({
            status: 'success',
            code: HTTP_STATUS_CODES.OK,
            payload: { contact }
        });
    } else {
        res.json({
            status: 'fail',
            code: HTTP_STATUS_CODES.NOT_FOUND,
            payload: { message: 'Contact not found' }
        });
    }
}

const createContact = async(req, res, next) => {
    const contact = await contactRepository.createContact(req.body);
    res.status(HTTP_STATUS_CODES.CREATED).json({
        status: 'success',
        code: HTTP_STATUS_CODES.CREATED,
        payload: { contact }
    });
}

const deleteContact = async(req, res, next) => {
    try {
        const contact = await contactRepository.deleteContact(req.params.contactId);
        if (contact) {
            res.json({
                status: 'success',
                code: HTTP_STATUS_CODES.NO_CONTENT,
                payload: { message: 'Contact deleted' }
            });
        } else {
            res.json({
                status: 'fail',
                code: HTTP_STATUS_CODES.NOT_FOUND,
                payload: { message: 'Contact not found' }
            });
        }

    } catch (err) {
        next(err);
    }
}

const updateContact = async(req, res, next) => {
    const contact = await contactRepository.updateContact(req.params.contactId, req.body);
    if (contact) {
        res.json({
            status: 'success',
            code: HTTP_STATUS_CODES.OK,
            payload: { contact }
        });
    } else {
        res.json({
            status: 'fail',
            code: HTTP_STATUS_CODES.NOT_FOUND,
            payload: { message: 'Contact not found' }
        });
    }

}

const updateFavorite = async(req, res, next) => {
    const contact = await contactRepository.updateFavorite(req.params.contactId, req.body);
    if (contact) {
        res.json({
            status: 'success',
            code: HTTP_STATUS_CODES.OK,
            payload: { contact }
        });
    } else {
        res.json({
            status: 'fail',
            code: HTTP_STATUS_CODES.NOT_FOUND,
            payload: { message: 'Contact not found' }
        });
    }

}

module.exports = {
    getContacts,
    getContactById,
    createContact,
    deleteContact,
    updateContact,
    updateFavorite
}