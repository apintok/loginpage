const express = require('express'),
	User = require('../models/UserModel'),
	router = express.Router();
// -------------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	wrn = chalk.bold.yellow,
	err = chalk.bold.red;
// -------------------------------------- \\

router.get('/register', (req, res) => {
	res.render('register.ejs', {
		error: ''
	});
});

router.get('/register/user/:id', async (req, res) => {
	try {
		log('Registered User GET - ID: ' + wrn(req.params.id));
		const user = await User.findById(req.params.id);
		log('Sign Up GET User - USER: ' + wrn(user));
		res.status(200).send(user);
	} catch (e) {
		log('Registered User GET - Catch Error: ' + err(e));
		res.status(404).send();
	}
});

router.get('/register/user', async (req, res) => {
	try {
		log('Registered Users GET');
		const users = await User.find();
		res.status(200).send(users);
	} catch (e) {
		log('Registered Users GET - Catch Error: ' + err(e));
		res.status(404).send();
	}
});

router.post('/register', async (req, res) => {
	log('Registered User POST - Request Body: ' + wrn(JSON.stringify(req.body)));

	try {
		const user = new User(req.body);

		await user.save();

		res.status(201).send('You have Registered Sucessfully!');
	} catch (e) {
		log('\nRegistered User POST - Catch Error: ' + err(e));

		if (e.errors.password.properties.type == 'required' && e.errors.password.properties.path == 'password') {
			res.status(400).render('register.ejs', {
				error: e
			});
		} else {
			res.status(400).send(e);
		}
	}
});

router.delete('/register/user/:id', async (req, res) => {
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
