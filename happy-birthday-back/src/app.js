const express = require('express');
const cors = require('cors');

const hostname = '0.0.0.0';
const port = 3002;

const server = express();


server.use(cors(
{ 
  origin: 'http://localhost:3002',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}
));

server.use(express.urlencoded());
server.use(express.json());

const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

const csvToDatabaseRoute = require('./api/routes/csvToDatabaseRoute.js');
csvToDatabaseRoute(server);

server.listen(port, hostname, () => {
  console.log(`Serveur qui tourne sur le port ${port}`);
});
