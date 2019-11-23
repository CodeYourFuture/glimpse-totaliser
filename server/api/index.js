const Shopify = require('shopify-api-node');
const express = require('express');
const router = express.Router();
const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;

const shopify = new Shopify({
	shopName: SHOPIFY_SHOP_NAME,
	apiKey: SHOPIFY_API_KEY,
	password: SHOPIFY_PASSWORD,
});

const callShopify = () => {
	const currentDate = new Date(); // Return orders only form current day
	shopify.order
		.list({ financial_status: 'paid', created_at_min: currentDate })
		.then(orders => {
			const totalPrice = orders.reduce((acc, value, index) => {
				return acc + Number(value.total_price);
			}, 0);
			console.log(totalPrice);
		})
		.catch(err => console.error(err));
};

const timer = 30000;

setInterval(callShopify, timer);

router.post('/transaction', async (req, res) => {
	console.log(req.body.totalPrice);

	res.sendStatus(200);
});

module.exports = router;
