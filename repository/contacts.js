const Contact = require('../models/contact');

const getContacts = async() => {
    const result = await Contact.find();
    return result;

}

const getContactById = async(contactId) => {
    const result = await Contact.findById({ _id: contactId });
    return result;
}

const createContact = async(body) => {
    const result = await Contact.create(body);
    return result;
}

const updateContact = async(contactId, body) => {
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, {...body }, { new: true });
    return result;
}

const deleteContact = async(contactId) => {
    const result = await Contact.findByIdAndDelete({ _id: contactId });
    return result;
}

const updateFavorite = async(contactId, body) => {
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, {...body }, { new: true });
    return result;
}


module.exports = {
    getContacts,
    getContactById,
    createContact,
    updateContact,
    deleteContact,
    updateFavorite
}