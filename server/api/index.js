const Shopify = require("shopify-api-node");
const express = require("express");
const router = express.Router();
const io = require("../server");

const { SHOPIFY_SHOP_NAME, SHOPIFY_API_KEY, SHOPIFY_PASSWORD } = process.env;

const shopify = new Shopify({
  shopName: SHOPIFY_SHOP_NAME,
  apiKey: SHOPIFY_API_KEY,
  password: SHOPIFY_PASSWORD
});

const getToday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

const getYesterday = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() - 1);
  return date.toISOString();
};

const getOrdersTotal = (from, to) => {
  return shopify.order
    .list({
      financial_status: "paid",
      created_at_min: from,
      created_at_max: to
    })
    .then(orders =>
      orders.reduce((acc, value, index) => acc + Number(value.total_price), 0)
    )
    .catch(console.error);
};

io.on("connection", socket => {
  console.log("User connected");
  const yesterday = getYesterday();
  const today = getToday();
  getOrdersTotal(yesterday, today).then(total => {
    io.emit("yesterdaysTotal", total);
  });
  getOrdersTotal(today).then(total => {
    io.emit("todaysTotal", total);
  });
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

router.post("/transaction", (req, res) => {
  const today = getToday();
  getOrdersTotal(today).then(total => {
    io.emit("todaysTotal", total);
  });
  res.sendStatus(200);
});

module.exports = router;
