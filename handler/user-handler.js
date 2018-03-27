const { userId, userKey } = require('../config/params');
module.exports = {
	checkUser(req, res, next) {
		const auth = req.get('Authorization') ? Buffer.from(req.get('Authorization'), 'base64').toString() : '';
		if (userId && userKey && auth != `${userId}:${userKey}`) {
			res.set('WWW-Authenticate', 'Basic realm="Meta API"');
			return res.status(401).send();
		}
		next();
	}
};