require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./api");
const app = express();
const axios = require("axios");
const path = require("path");
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(bodyParser.json());
app.use(cors());

app.use("/api", api.router);
const port = process.env.PORT || 5000;

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

io.on("connection", socket => {
  console.log("User connected");
  setInterval(() => {
    socket.emit("FromAPI", "50");
  }, 1000);
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

/**
 * In development environemnt, we use the create-react-app dev server.
 * In production, the static build is served from here
 */

if (process.env.NODE_ENV !== "development") {
  app.use("/", express.static(path.resolve(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));
