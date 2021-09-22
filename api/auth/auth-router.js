const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model');
const { buildToken } = require('./token-builder');
const {
	checkCredetials,
	checkNameExist,
	checkUserNameInDb,
} = require('../users/usermiddleware');

router.post('/register', checkCredetials, checkNameExist, (req, res, next) => {
	console.log('one');
	const { name, email, username, password } = req.body;
	const hash = bcrypt.hashSync(password, 8);
	Users.insertUser({ name, email, username, password: hash })
		.then((newUser) => {
			res.status(201).json(newUser);
		})
		.catch(next);
});

router.post('/login', checkUserNameInDb, (req, res, next) => {
	if (bcrypt.compareSync(req.body.password, req.user.password)) {
		const token = buildToken(req.user);

		res.json({
			message: `Welcome, ${req.user.username}`,
			token,
		});
	} else {
		next({ status: 401, message: 'invalid credentials' });
	}
});

module.exports = router;
