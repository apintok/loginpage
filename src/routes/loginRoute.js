const express = require('express'),
	passport = require('passport'),
	{ initializePassport, checkAuthenticated, checkNotAuthenticated } = require('../utils/passport-config'),
	router = express.Router();
// ------------------------------------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	wrn = chalk.bold.yellow,
	err = chalk.bold.red;
// ----------------------------- \\

router.get('/', (req, res) => {
	log('user is: ' + JSON.stringify(req.user));
	if (req.user == undefined) {
		var username = undefined;
	} else {
		var username = req.user.username;
	}
	res.render('index.ejs', {
		username: username
	});
});

router.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs');
});

router.post(
	'/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);

router.delete('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
