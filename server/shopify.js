const Shopify = require("shopify-api-node");

const {
  SHOPIFY_UK_SHOP_NAME,
  SHOPIFY_UK_API_KEY,
  SHOPIFY_UK_PASSWORD,
  SHOPIFY_US_SHOP_NAME,
  SHOPIFY_US_API_KEY,
  SHOPIFY_US_PASSWORD,
  SHOPIFY_DEV_UK_SHOP_NAME,
  SHOPIFY_DEV_UK_API_KEY,
  SHOPIFY_DEV_UK_PASSWORD,
  SHOPIFY_DEV_US_SHOP_NAME,
  SHOPIFY_DEV_US_API_KEY,
  SHOPIFY_DEV_US_PASSWORD
} = process.env;

const shopify = {};

const addStore = (store, name, key, pass) => {
  if ((name, key, pass)) {
    shopify[store] = new Shopify({
      shopName: name,
      apiKey: key,
      password: pass
    });
  } else {
    console.log(
      `Unable to set up ${store} store due to missing credentials in environment`
    );
  }
};

addStore("uk", SHOPIFY_UK_SHOP_NAME, SHOPIFY_UK_API_KEY, SHOPIFY_UK_PASSWORD);
addStore("us", SHOPIFY_US_SHOP_NAME, SHOPIFY_US_API_KEY, SHOPIFY_US_PASSWORD);
addStore(
  "dev-uk",
  SHOPIFY_DEV_UK_SHOP_NAME,
  SHOPIFY_DEV_UK_API_KEY,
  SHOPIFY_DEV_UK_PASSWORD
);
addStore(
  "dev-us",
  SHOPIFY_DEV_US_SHOP_NAME,
  SHOPIFY_DEV_US_API_KEY,
  SHOPIFY_DEV_US_PASSWORD
);

module.exports = shopify;
