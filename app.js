/**
 * ! LOGIN PAGE
 * * App to learn user authentication
 */

require('dotenv').config();
require('./src/db/mlab');
const express = require('express'),
	navRoute = require('./src/routes/navRoute'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	flash = require('express-flash'),
	passport = require('passport'),
	{ initializePassport, checkAuthenticated, checkNotAuthenticated } = require('./src/utils/passport-config'),
	app = express(),
	PORT = 3000;
// ------------------------------------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	wrn = chalk.bold.yellow,
	err = chalk.bold.red;
// ----------------------------- \\

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initializePassport(passport);

app.use(flash());
app.use(session({
	secret: process.env.SECRET,
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', checkAuthenticated, (req, res) => {
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

app.get('/login', checkNotAuthenticated, (req, res) => {
	res.render('login.ejs');
});

app.post(
	'/login',
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);

app.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/login');
});

app.use(navRoute);

app.get('*', (req, res) => {
	res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
	log(`\nServer Running on Port - ${scs(PORT)}\n`);
});
