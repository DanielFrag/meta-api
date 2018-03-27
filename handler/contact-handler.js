const contactBusiness = require('../business/contact-business');
const contactRepository = require('../repository/contact-repository');
module.exports = {
	async createContact(req, res) {
		if (!contactBusiness.validateContact(req.body)) {
			return res.status(400).send('Missing params');
		}
		const newContact = await contactRepository.createContact(req.body);
		res.set('Location', `/${newContact.id}`);
		res.status(201).send();
	},
	async getContact(req, res) {
		if (!(req.params.idContato && contactBusiness.validateId(req.params.idContato))) {
			return res.status(400).send('Missing param');
		}
		const contact = await contactRepository.getContact(req.params.idContato);
		if (!contact) {
			return res.status(404).send('Not found');
		}
		return res.json(contact);
	},
	async getContactList(req, res) {
		const size = req.query.size ? parseInt(req.query.size) : 10;
		const page = req.query.page ? parseInt(req.query.page) : 0;
		const list = await contactRepository.getContactList(size * page, size);
		if (!list || list.length == 0) {
			return res.status(404).send('Not found');
		}
		res.json(list);
	},
	async removeContact(req, res) {
		if (!(req.params.idContato && contactBusiness.validateId(req.params.idContato))) {
			return res.status(400).send('Missing param');
		}
		const result = await contactRepository.removeContact(req.params.idContato);
		if (!result) {
			return res.status(404).send('Not found');
		}
		res.status(204).send();
	},
	async updateContact(req, res) {
		if (!(req.params && contactBusiness.validateId(req.params.idContato) && req.body && contactBusiness.validateContact(req.body))) {
			return res.status(400).send('Missing param');
		}
		const contact = await contactRepository.updateContact(req.params.idContato, req.body);
		if (!contact) {
			return res.status(404).send('Not found');
		}
		res.status(204).send();
	}
}