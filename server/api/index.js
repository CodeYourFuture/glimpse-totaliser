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
	const getHours = currentDate.getHours();
	return shopify.order
		.list({ financial_status: 'paid', created_at_max: getHours })
		.then(orders => {
			const totalPrice = orders.reduce((acc, value, index) => {
				return acc + Number(value.total_price);
			}, 0);
			return {
				totalPrice,
			};
		})
		.catch(err => console.error(err));
};

router.post('/transaction', (req, res) => {
	callShopify().then(data => {
		console.log(data.totalPrice);
	});
	res.sendStatus(200);
});

module.exports = router;
