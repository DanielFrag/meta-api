const contact = require('../handler/contact-handler');
const userHandler = require('../handler/user-handler');
module.exports = (app) => {
	app.use('/', userHandler.checkUser);
	app
		.route('/')
		.get(contact.getContactList)
		.post(contact.createContact);
	app
		.route('/:idContato')
		.get(contact.getContact)
		.put(contact.updateContact)
		.delete(contact.removeContact);
};
