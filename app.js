/**
 * ! LOGIN PAGE
 * * App to learn user authentication
 */

require('./src/db/mlab');
const express = require('express'),
	loginRoute = require('./src/routes/loginRoute'),
	signupRoute = require('./src/routes/signupRoute'),
	bodyParser = require('body-parser'),
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
app.use(loginRoute);
app.use(signupRoute);

app.get('/', (req, res) => {
	const test = { age: 30 };
	res.render('index.ejs', {
		test
	});
});

app.get('*', (req, res) => {
	res.status(404).send('Page Not Found');
});

app.listen(PORT, () => {
	log(`\nServer Running on Port - ${scs(PORT)}\n`);
});
