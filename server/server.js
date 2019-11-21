require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');

const server = express(); // create a server

server.use(bodyParser.json());
server.use(cors());

server.use('/api', api);

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server is running on port ${port}`));
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// create a GET route
app.get('/express_backend', (req, res) => {
	res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});

/**
 * In development environemnt, we use the create-react-app dev server.
 * In production, the static build is served from here
 */
//
if (process.env.NODE_ENV !== 'development') {
	app.use('/', express.static(path.resolve(__dirname, '../client/build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
	});
}

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
