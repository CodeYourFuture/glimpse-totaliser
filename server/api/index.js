const express = require('express');
const router = express.Router();

router.get('/shopify', (req, res) => {
	res.send('Test');
});

module.exports = router;
