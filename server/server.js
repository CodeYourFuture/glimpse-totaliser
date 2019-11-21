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
