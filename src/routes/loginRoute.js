const express = require('express'),
	User = require('../models/UserModel'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	bcrypt = require('bcrypt'),
	router = express.Router();
// -------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	wrn = chalk.bold.yellow,
	err = chalk.bold.red;
// ----------------------------- \\

/**
 * ! PASSPORT CONFIGURATION
 * * STRATEGY *
 */

passport.use(
	new LocalStrategy(function (username, password, done) {
		User.findOne({ username: username }, async function (error, user) {
			if (error) {
				log('Passport - Err!: ' + wrn(error));
				return done(error);
			}
			if (!user) {
				log('Passport - User Not Found!');
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!(await bcrypt.compare(password, user.password))) {
				log(err('Passport - Wrong Password!'));
				return done(null, false, { message: 'Incorrect password.' });
			}
			log('Passport - USER: ' + msg(user));
			return done(null, user);
		});
	})
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

router.get('/login', (req, res) => {
	res.send('works');
});

router.post(
	'/login',
	passport.initialize(),
	passport.authenticate('local', { failureRedirect: '/login', failureFlash: false }),
	(req, res) => {
		try {
			res.redirect('/');
		} catch (e) {
			log('Login POST - Catch Error: ' + err(e));
			res.status(404).send(e);
		}
	}
);

module.exports = router;
