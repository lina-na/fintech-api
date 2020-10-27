const jwt = require('jsonwebtoken');
const config = require('config');

const auth = (req, res, next) => {
	const token = req.header('token');
	if (!token) return res.status(401).send('Access denied. No token provided.');

	try {
		req.user = jwt.verify(token, config.get('jwt'));
		next();
	} catch (ex) {
		res.status(401).send('Invalid token.');
	}
}

module.exports = auth;