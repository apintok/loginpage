const express = require('express'),
	router = express.Router();
// -------------------------------- \\

router.get('/login', (req, res) => {
	res.send('works');
});

module.exports = router;
