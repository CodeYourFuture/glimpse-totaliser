const Shopify = require("shopify-api-node");
const express = require("express");
const axios = require("axios");


const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;
const router = express.Router();

const shopify = new Shopify({
	shopName: SHOPIFY_SHOP_NAME,
	apiKey: SHOPIFY_API_KEY,
	password: SHOPIFY_PASSWORD,
});

// const create = param => {
// 	shopify.order
// 		.create(param)
// 		.then(data => console.log(data))
// 		.catch(err => console.error(err));
// };

const data = shopify.order
	.list({ financial_status: 'paid' })
	.then(orders => {
		const totalPrice = orders.reduce((acc, value, index) => {
			return acc + Number(value.total_price);
		}, 0);
		return totalPrice;
	})
	.catch(err => console.error(err));

router.get("/transaction", async (req, res) => {
  try {
	  data.then(totalPrice => {
		res.status(200).json({ success: true, totalPrice });
	  })
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});




module.exports = {router, data} 

