/**
 * ! LOGIN PAGE
 * * App to learn user authentication
 */

require('./src/db/atlas');
const express = require('express'),
	loginRoute = require('./src/routes/loginRoute'),
	registerRoute = require('./src/routes/registerRoute'),
	navRoute = require('./src/routes/navRoute'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	path = require('path'),
	session = require('express-session'),
	flash = require('express-flash'),
	passport = require('passport'),
	{ initializePassport } = require('./src/utils/passport-config'),
	app = express(),
	port = process.env.PORT;
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

app.listen(port, () => {
	log(`\nServer Running on Port - ${scs(port)}\n`);
});
