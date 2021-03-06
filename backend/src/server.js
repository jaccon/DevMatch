const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const tcpPort = 3333;
const server = express();
const cors = require('cors');

mongoose.connect('mongodb+srv://tindev:tindev@cluster0-6nxfb.mongodb.net/tindev?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(cors());
server.use(express.json());
server.use(routes);
server.listen(tcpPort);
