const db = require('../data/dbConfig');

module.exports = {
	findAll,
	findBy,
	findById,
	add,
	update,
	remove,
	insertUser,
	getAllUsers,
};

async function insertUser(user) {
	const [newUserObject] = await db('users').insert(user, [
		'user_id',
		'username',
		'password',
	]);
	return newUserObject;
}

function getAllUsers(filter) {
	return db('users').select('user_id', 'username', 'password').where(filter);
}

function findAll() {
	return db('users');
}

function findBy(filter) {
	return db('users').where(filter);
}

function findById(id) {
	return db('users').where('user_id', id).first();
}

async function add(user) {
	return db('users')
		.insert(user, 'user_id')
		.then(([id]) => {
			return findById(id);
		});
}

async function update(id, newInfo) {
	return db('users').where('user_id', id).update(newInfo);
}

async function remove(id) {
	const removed = await db('users').where('user_id', id).first();
	await db('users').del().where('user_id', id);
	return removed;
}
