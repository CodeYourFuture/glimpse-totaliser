const Shopify = require('shopify-api-node');
const express = require('express');
const router = express.Router();
const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;

const shopify = new Shopify({
	shopName: SHOPIFY_SHOP_NAME,
	apiKey: SHOPIFY_API_KEY,
	password: SHOPIFY_PASSWORD,
});

shopify.order
	.list({ financial_status: 'paid' })
	.then(orders => {
		const totalPrice = orders.reduce((acc, value, index) => {
			return acc + Number(value.total_price);
		}, 0);
		console.log(totalPrice);
	})
	.catch(err => console.error(err));

router.post('/transaction', async (req, res) => {
	console.log(req.body);
	try {
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

module.exports = router;
