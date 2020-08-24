/**
 * ! LOGIN PAGE
 * * App to learn user authentication
 */

require('dotenv').config();
require('./src/db/mlab');
const express = require('express'),
	loginRoute = require('./src/routes/loginRoute'),
	registerRoute = require('./src/routes/registerRoute'),
	navRoute = require('./src/routes/navRoute'),
	bodyParser = require('body-parser'),
	path = require('path'),
	session = require('express-session'),
	flash = require('express-flash'),
	methodOverride = require('method-override'),
	passport = require('passport'),
	{ initializePassport } = require('./src/utils/passport-config'),
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

/**
 * ! SERVER PUBLIC DIRECTORY
 */
const publicDir = express.static(path.join(__dirname, 'public')),
      cssDir    = express.static(path.join(__dirname, 'public/css'));
// ------------------------------------------------------------------------------------------- \\

app.use(publicDir);
app.use(cssDir);
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

initializePassport(passport);

app.use(flash());
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

app.use(loginRoute);
app.use(registerRoute);
app.use(navRoute);

app.listen(PORT, () => {
	log(`\nServer Running on Port - ${scs(PORT)}\n`);
});
