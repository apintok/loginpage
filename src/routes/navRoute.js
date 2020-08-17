const express = require('express'),
	router = express.Router();
// ----------------------------------------- \\

const chalk = require('chalk'),
	log = console.log,
	msg = chalk.bold.blue,
	scs = chalk.bold.green,
	wrn = chalk.bold.yellow,
	err = chalk.bold.red;
// ------------------------------- \\

router.get('*', (req, res) => {
	res.status(404).send('Page Not Found');
});

module.exports = router;
