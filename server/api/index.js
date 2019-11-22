const Shopify = require('shopify-api-node');

const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;

const shopify = new Shopify({
	shopName: SHOPIFY_SHOP_NAME,
	apiKey: SHOPIFY_API_KEY,
	password: SHOPIFY_PASSWORD,
});

const create = param => {
	shopify.order
		.create(param)
		.then(data => console.log(data))
		.catch(err => console.error(err));
};

shopify.order
	.list({ financial_status: 'paid' })
	.then(orders => {
		const totalPrice = orders.reduce((acc, value, index) => {
			return acc + Number(value.total_price);
		}, 0);
		create({ totalPrice });
	})
	.catch(err => console.error(err));
