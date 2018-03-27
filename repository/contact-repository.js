const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
module.exports = {
	async createContact(contact) {
		const c = await Contact.create(contact);
		return c.toDTO();
	},
	async getContact(contactId) {
		const c = await Contact.findById(contactId);
		return c.toDTO();
	},
	async getContactList(skip, limit) {
		const cList = await Contact
			.find({})
			.sort({nome: 1})
			.skip(skip)
			.limit(limit);
		const cDTO = [];
		cList.forEach(c => {
			cDTO.push(c.toDTO());
		});
		return cDTO;
	},
	async removeContact(contactId) {
		const c = await Contact.findByIdAndRemove(contactId);
		return c.toDTO();
	},
	async updateContact(contactId, fieldsToUpdate) {
		const c = Contact.findByIdAndUpdate(contactId, fieldsToUpdate);
		return c.cDTO();
	}
}