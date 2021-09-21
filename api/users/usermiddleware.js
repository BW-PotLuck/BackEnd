//for your signup portion

const { getAllUsers } = require('../users/users-model');

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

module.exports = { checkCredetials, checkNameExist };
