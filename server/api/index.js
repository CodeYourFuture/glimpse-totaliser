const Shopify = require('shopify-api-node');
const express = require('express');
const router = express.Router();

const app = require("../server");
const http = require("http").createServer(app);
const io = require("socket.io")(http);


const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;


const shopify = new Shopify({
	shopName: SHOPIFY_SHOP_NAME,
	apiKey: SHOPIFY_API_KEY,
	password: SHOPIFY_PASSWORD,
});

const callShopify = () => {
	const newDate = new Date();
	const year = newDate.getFullYear();
	const month = newDate.getMonth();
	const day = newDate.getDate();
	const currentDate = new Date(year, month, day).toISOString(); // Return orders only form current day
	
	console.log('Time', currentDate);
	return shopify.order
	.list({ financial_status: 'paid', created_at_min: currentDate })
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


io.on("connection", socket => {
	console.log("User connected");
	socket.on("disconnect", () => {
		console.log("User disconnected");
	});	
});
router.post('/api/transaction', (req, res) => {
	callShopify().then( data => {
	 io.emit("Total", data.totalPrice );	})
});



module.exports = router;
