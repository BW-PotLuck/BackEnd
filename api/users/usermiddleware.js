//for your signup portion

const { getAllUsers } = require('../users/users-model');

const checkCredetials = (req, res, next) => {
	try {
		if (
			!req.body.name ||
			!req.body.email ||
			!req.body.username ||
			!req.body.password
		) {
			next({ message: 'all fields are required' });
		} else {
			next();
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

const checkUserNameInDb = async (req, res, next) => {
	try {
		const [user] = await getAllUsers({ username: req.body.username });
		if (!user) {
			next({ message: 'invalid credentials' });
		} else {
			req.user = user;
			next();
		}
	} catch (error) {
		next(error);
	}
};
module.exports = { checkCredetials, checkNameExist, checkUserNameInDb };
