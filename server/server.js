require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

require("./socket")(io);

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

app.all("/api/square/token", (req, res) => {
  console.log(req);
  console.log(req.body);
  require("./square")(req.query.code || req.body.code);
  res.send(200);
});

app.post("/api/payment", (req, res) => {
  const { type } = req.body;
  if (type === "inventory.count.updated") {
    res.send(200);
    return;
  }
  console.log(req.body);
  res.send(200);
});

/**
 * In development environemnt, we use the create-react-app dev server.
 * In production, the static build is served from here
 */
//
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

// console.log that your server is up and running
http.listen(port, () => console.log(`Listening on port ${port}`));
