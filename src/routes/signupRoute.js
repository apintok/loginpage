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

router.get('/signup', (req, res) => {
	res.render('signup.ejs');
});

router.post('/signup', async (req, res) => {
	log('Sign Up POST - Request Content-Type: ' + wrn(req.headers['content-type']));
	log('Sign Up POST - Request Body: ' + wrn(JSON.stringify(req.body)));

	try {
		const user = new User(req.body);

		await user.save();
		res.status(201).send('You have Sign Up Sucessfully!');
	} catch (e) {
		log('Sign Up POST - Catch Error: ' + err(e));
	}
});

module.exports = router;
