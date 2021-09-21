const router = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../users/users-model');
const { checkCredetials, checkNameExist } = require('./auth-middleware');

router.post('/register', checkCredetials, checkNameExist, (req, res, next) => {
	const { username, password } = req.body;
	const hash = bcrypt.hashSync(password, 8);
	User.insertUser({ username, password: hash })
		.then((newUser) => {
			res.status(201).json(newUser);
		})
		.catch(next);
});
