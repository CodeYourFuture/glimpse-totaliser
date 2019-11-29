const shopify = require("./shopify");
const AsyncPolling = require("async-polling");

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

getDateFromString = str =>
  ({
    today: getToday(),
    yesterday: getYesterday()
  }[str]);

const getOrdersTotal = (store, from, to) =>
  store.order
    .list({
      financial_status: "paid",
      created_at_min: getDateFromString(from),
      created_at_max: getDateFromString(to)
    })
    .then(orders =>
      orders.reduce((acc, order, index) => acc + Number(order.total_price), 0)
    )
    .catch(console.error);

module.exports = io => {
  const pollers = {};
  const clientCounts = {};

  io.on("connection", socket => {
    console.log("Client connected");

    const storeName = socket.handshake.query.store;
    const store = shopify[storeName];

    if (!clientCounts[storeName]) {
      clientCounts[storeName] = 0;
    } else {
      clientCounts[storeName]++;
    }

    if (!store) {
      // Could emit an error status to the client here
      console.log("No store could be found for " + store);
      return;
    }

    getOrdersTotal(store, "yesterday", "today").then(total => {
      socket.emit("yesterdaysTotal", total);
    });

    if (!pollers[storeName]) {
      pollers[storeName] = new AsyncPolling(end => {
        getOrdersTotal(store, "today")
          .then(result => end(null, result))
          .catch(end);
      }, 2000);
      pollers[storeName].run();
    }

    pollers[storeName].on("result", total => {
      socket.emit("todaysTotal", total);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
      clientCounts[storeName]--;
      if (clientCounts[storeName] < 1 && pollers[storeName]) {
        pollers[storeName].stop();
        pollers[storeName] = null;
      }
    });
  });
};
