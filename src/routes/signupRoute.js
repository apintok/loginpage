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

router.get('/signup/user/:id', async (req, res) => {
	try {
		log('Sign Up GET user - ID: ' + wrn(req.params.id));
		const user = await User.findById(req.params.id);
		log('Sign Up GET User - USER: ' + wrn(user));
		res.status(200).send(user);
	} catch (e) {
		log('Sign Up GET User - Catch Error: ' + err(e));
		res.status(404).send();
	}
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
		res.status(500).send(e);
	}
});

router.delete('/signup/user/:id', async (req, res) => {
	try {
		log('Sign Up DELETE user - ID: ' + wrn(req.params.id));
		const user = await User.findByIdAndDelete(req.params.id);
		log('Sign Up DELETE User - USER: ' + wrn(user));
		res.status(200).send();
	} catch (error) {
		log('Sign Up DELETE - Catch Error: ' + err(e));
		res.status(500).send();
	}
});

module.exports = router;
