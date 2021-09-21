<<<<<<< HEAD
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const { getAllUsers, insertUser } = require('./users/users-model');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', async (req, res) => {
	res.json({
		JesseUnit4:
			'Good evening welcome to our potluck api cant wait to start work with everyone!',
	});
});

server.get('/api/users', async (req, res) => {
	res.json(await getAllUsers());
});

server.post('/api/users', async (req, res) => {
	res.status(201).json(await insertUser(req.body));
});

server.use((err, req, res, next) => {
	//eslint-disable-line
	res.status(500).json({ message: err.message });
});
module.exports = server;
=======
   
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const { restricted } = require('./auth/auth-middleware')


const userRouter = require('./users/users-router')
const authRouter = require('./auth/auth-router')


const server = express()
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/users', restricted, userRouter)
server.use('/api/auth', authRouter)


server.use((err, req, res, next) => { //eslint-disable-line
  res.status(500).json({ message: err.message })
})

module.exports = server
>>>>>>> 318f6d6bc0651c7da54ba9d4066c6bb1132855b7
