const channelValidator = [];
channelValidator['email'] = (value) => {
	return /^\w+((\.|-|\+)?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(value);
};
channelValidator['celular'] = (value) => {
	if (typeof value != 'string') {
		return false;
	}
	value = value.replace(/\+|\(|\)|\-|\s/g, '');
	return /^\d{8,11}$/.test(value);
};
channelValidator['fixo'] = (value) => {
	if (typeof value != 'string') {
		return false;
	}
	value = value.replace(/\+|\(|\)|\-|\s/g, '');
	return /^\d{8,10}$/.test(value);
};
module.exports = {
	validateContact(contact) {
		if (typeof contact != 'object' || !(contact.nome && contact.canal && contact.valor && contact.obs)) {
			return false;
		}
		const keys = Object.keys(contact);
		if (keys.length != 4) {
			return false;
		}
		if (['email', 'celular', 'fixo'].indexOf(contact.canal) == -1) {
			return false;
		}
		if (!channelValidator[contact.canal](contact.valor)) {
			return false;
		}
		return true;
	},
	validateId(contactId) {
		return /^[0-9a-f]{24}$/.test(contactId);
	}
}