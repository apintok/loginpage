const express = require('express'),
	User = require('../models/UserModel'),
	router = express.Router();
// -------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	wrn = chalk.bold.yellow,
	err = chalk.bold.red;
// ----------------------------- \\

router.get('/login', (req, res) => {
	res.send('works');
});

router.post('/login', (req, res) => {
	try {
		const username = req.body.username;
		log('Login POST - Username: ' + wrn(username));
		const user = User.findOne({ username });
		log('Login POST - User Found: ' + wrn(user));

		res.status(200).send();
	} catch (e) {
		log('Login POST - Catch Error: ' + err(e));
		res.status(404).send(e);
	}
});

module.exports = router;
