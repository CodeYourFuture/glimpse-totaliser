const shopify = require("./shopify");
const AsyncPolling = require("async-polling");
const { getDateFromString, paginate } = require("./utils");

const getOrdersTotal = (store, from, to) =>
  paginate(
    {
      limit: 250,
      status: "any",
      financial_status: "paid",
      fulfillment_status: "shipped",
      created_at_min: getDateFromString(from),
      created_at_max: getDateFromString(to)
    },
    params => store.order.list(params)
  )
    .then(orders =>
      orders.reduce((acc, order, index) => acc + Number(order.total_price), 0)
    )
    .catch(console.error);

module.exports = io => {
  const pollers = {};
  const clientCounts = {};

  io.on("connection", socket => {
    const storeName = socket.handshake.query.store;
    const store = shopify[storeName];

    if (!clientCounts[storeName]) {
      clientCounts[storeName] = 1;
    } else {
      clientCounts[storeName]++;
    }

    console.log("Client connected", clientCounts);

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
      }, 1500);
      pollers[storeName].run();
    }

    pollers[storeName].on("result", total => {
      socket.emit("todaysTotal", total);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", clientCounts);
      clientCounts[storeName]--;
      if (clientCounts[storeName] < 1 && pollers[storeName]) {
        pollers[storeName].stop();
        pollers[storeName] = null;
      }
    });
  });
};
