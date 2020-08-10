/**
 * ! LOGIN PAGE
 * * App to learn user authentication
 */

const { json } = require('body-parser');

require('./src/db/mlab');
const express = require('express'),
	navRoute = require('./src/routes/navRoute'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	User = require('./src/models/UserModel'),
	flash = require('express-flash'),
	passport = require('passport'),
	LocalStrategy = require('passport-local'),
	bcrypt = require('bcrypt'),
	app = express(),
	PORT = 3000;
// ----------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	wrn = chalk.bold.yellow,
	err = chalk.bold.red;
// ----------------------------- \\

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * ! PASSPORT CONFIGURATION
 * * STRATEGY
 * * PASSPORT-LOCAL
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

const sessionDetails = {
	secret: 'love asia',
	resave: false,
	saveUninitialized: false
};

app.use(flash());
app.use(session(sessionDetails));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

app.use(navRoute);

app.get('/', (req, res) => {
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

app.get('/login', (req, res) => {
	res.render('login.ejs');
});

app.post(
	'/login',
	checkNotAuthenticated,
	passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);

app.get('/logout', (req, res) => {});

app.get('*', (req, res) => {
	res.status(404).send('Page Not Found');
});

function checkAuthenticated(req, res, next) {
	log(req.isAuthenticated());
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

function checkNotAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		// res.redirect('/');
	}

	next();
}

app.listen(PORT, () => {
	log(`\nServer Running on Port - ${scs(PORT)}\n`);
});
