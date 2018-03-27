const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
module.exports = {
	async createContact(contact) {
		return Contact.create(contact);
	},
	async getContact(contactId) {
		return Contact
			.findById(contactId)
			.lean();
	},
	async getContactList(skip, limit) {
		return Contact
			.find({})
			.sort({nome: 1})
			.skip(skip)
			.limit(limit)
			.lean();
	},
	async removeContact(contactId) {
		return Contact
			.findByIdAndRemove(contactId)
			.lean();
	},
	async updateContact(contactId, fieldsToUpdate) {
		return Contact
			.findByIdAndUpdate(contactId, fieldsToUpdate)
			.lean();
	}
}