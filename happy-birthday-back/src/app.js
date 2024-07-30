const express = require('express');
const cors = require('cors');

const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const router = express.Router();

const { initializeDatabase} = require('./api/services/connectServiceDatabase.js');
const initializeDatabases = async ( ) => {
  await initializeDatabase();
}


dotenv.config();

const hostname = '0.0.0.0';
const port = 3002;

const server = express();

initializeDatabases()

server.use(cors(
{ 
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use(express.urlencoded());
server.use(express.json());


const birthdayRoute = require('./api/routes/birthdayRoute.js');
birthdayRoute(server);

const quoteRoute = require('./api/routes/quoteRoute.js');
quoteRoute(server);

const csvToDatabaseRoute = require('./api/routes/csvToDatabaseRoute.js');
csvToDatabaseRoute(server);

const authRoute = require('./api/routes/authRoute.js');
authRoute(server);

// Secure routes **********************************************************

const crudQuoteRoute = require('./api/routes/crudQuoteRoute.js');
crudQuoteRoute(server);

server.listen(port, hostname, () => {
  console.log(`Serveur qui tourne sur le port ${port}`);
});
