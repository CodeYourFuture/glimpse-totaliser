const Shopify = require('shopify-api-node');
const express = require('express');
const router = express.Router();
const io = require('../server');

const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;

const shopify = new Shopify({
	shopName: SHOPIFY_SHOP_NAME,
	apiKey: SHOPIFY_API_KEY,
	password: SHOPIFY_PASSWORD,
});

const getTotalPrice = (orders, day) => {
	const currentDay = new Date().getDate();
	return orders.reduce((acc, value) => {
		const createdAt = new Date(value.created_at).getDate();

		if (day && typeof day === 'number' && day < currentDay && day > 0 && day === createdAt) {
			console.log(value.created_at);
			return acc + Number(value.total_price);
		}
		if (day === currentDay || !day) {
			return acc + Number(value.total_price);
		}
		return acc + 0;
	}, 0);
};

const callShopify = (date, day) => {
	return shopify.order
		.list({ financial_status: 'paid', created_at_min: date })
		.then(orders => {
			return {
				totalPrice: getTotalPrice(orders, day),
			};
		})
		.catch(err => console.error(err));
};

io.on('connection', socket => {
	console.log('User connected');
	const day = new Date().getDate() - 1;
	const currentDate = getDate(day);
	callShopify(currentDate, day).then(data => {
		io.emit('Total', data.totalPrice);
	});
	socket.on('disconnect', () => {
		console.log('User disconnected');
	});
});

const getDate = day => {
	const newDate = new Date();
	const year = newDate.getFullYear();
	const month = newDate.getMonth();
	const customDay = newDate.getDate();
	if (typeof day === 'number' && day < customDay && day > 0) {
		const currentDate = new Date(year, month, day).toISOString();
		return currentDate;
	}
	const currentDate = new Date(year, month, customDay).toISOString();
	return currentDate;
};

router.post('/transaction', (req, res) => {
	const currentDate = getDate();
	callShopify(currentDate).then(data => {
		io.emit('Total', data.totalPrice);
		res.sendStatus(200);
	});
});

module.exports = router;
