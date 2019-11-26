require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const api = require("./api");
const router = express.Router();
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// app.use("/api", api);

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/express_backend", (req, res) => {
	res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/healthcheck", (req, res) => { 
	res.sendStatus(200) 
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

// module.exports = app;