require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const app = express();
const axios = require("axios");
const path = require('path');
const http = require ('http').createServer(app);
const io = require('socket.io')(http);
// const io = require('socket.io-client')('http://localhost:3000');

// const socketIo = require("socket.io");
// const index = require("./routes/index");
// app.use(index);

// const getApiAndEmit = "TODO"


app.use(bodyParser.json());
app.use(cors());


app.use('/api', api.router);
const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
// 	res.sendFile(__dirname + '/index.html');
// });

app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

let interval;
io.on("connection", socket => {
  console.log("User connected");
  if (interval) {
	clearInterval(interval);
  }
  interval = setInterval(() => getApiAndEmit(socket), 10000);
  socket.on("disconnect", () => {
	console.log("User disconnected");
  });
});

  const getApiAndEmit = async socket => {
	try {
	  const res = await axios.get(
		console.log("axious striks")
	  ); // Getting the data from DarkSky
	  socket.emit("FromAPI", res);
	} catch (error) {
	  console.error(`Error: ${error}`);
	}
  };
  


// io.on("connection", socket => {
// 	console.log("User connected"), setInterval(
// 	  () => getAPIdata(socket), 10000);
// 	socket.on("disconnect", () => console.log("User disconnected"));
//   });

//   const getAPIdata = async socket => {
// 	socket.emit("FromAPI", totalPrice); // Emitting a new message. It will be consumed by the client
// 	console.log("this socket !", socket)
//   };


/**
 * In development environemnt, we use the create-react-app dev server.
 * In production, the static build is served from here
 */
//

// if (process.env.NODE_ENV !== 'development') {
// app.use('/', express.static(path.resolve(__dirname, '../client/build')));
// 	app.get('*', (req, res) => {
// 		res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
// 	});
// }
// console.log that your server is up and running

http.listen(port, () => console.log(`Listening on port ${port}`));