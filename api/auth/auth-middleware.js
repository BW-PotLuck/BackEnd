const { getAllUsers } = require('../users/users-model');
const { secret } = require('../../secrets/safewithme');
const jwt = require('jsonwebtoken');

const restricted = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({ message: 'Token required' });
	}
	jwt.verify(token, secret, (err, decoded) => {
		if (err) {
			next({ status: 401, message: 'Token invalid' });
		} else {
			req.decoded = decoded;
			next();
		}
	});
};

const checkCredetials = (req, res, next) => {
	try {
		if (!req.bobdy.username || !req.body.password) {
			next({ message: 'username and password required' });
		}
	} catch (error) {
		next(error);
	}
};

const checkNameExist = async (req, res, next) => {
	try {
		const [user] = await getAllUsers({ username: req.body.username });
		if (user) {
			next({ message: 'username taken' });
		} else {
			next();
		}
	} catch (error) {
		next(error);
	}
};
module.exports = {
	restricted,
	checkCredetials,
	checkNameExist,
};
