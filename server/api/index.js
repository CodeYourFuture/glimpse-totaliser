const Shopify = require('shopify-api-node');
const express = require('express');
const axios = require('axios');

const { SHOP_NAME, API_KEY, PASSWORD } = process.env;
const router = express.Router();

const shopify = new Shopify({
	shopName: SHOP_NAME,
	apiKey: API_KEY,
	password: PASSWORD,
});

shopify.on('callLimits', limits => console.log(limits, 'test2'));

router.post('/transaction', async (req, res) => {
	const url = 'https://weglimpse.co/admin/api/2019-10/reports.json';
	try {
		//if (!res.headersSent) res.json({}, 0, 500);
		const data = await axios.get(url);
		if (data) {
			res.sendStatus(200).json(data);
		}
	} catch (error) {
       console.log(error);
		res.sendStatus(500).json(error);
	}
});

module.exports = router;
