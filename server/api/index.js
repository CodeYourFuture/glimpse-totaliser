const Shopify = require("shopify-api-node");
const express = require("express");
const axios = require("axios");

const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;
const router = express.Router();

const shopify = new Shopify({
  shopName: SHOPIFY_SHOP_NAME,
  apiKey: SHOPIFY_API_KEY,
  password: SHOPIFY_PASSWORD
});

shopify.on("callLimits", limits => console.log(limits, "test2"));

router.post("/transaction", async (req, res) => {
  console.log(req.body);
  const url = "https://weglimpse.co/admin/api/2019-10/reports.json";
  try {
    const { data } = await axios.get(url);

    if (data) {
      res.sendStatus(200).json(data);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500).json(error);
  }
});

module.exports = router;
