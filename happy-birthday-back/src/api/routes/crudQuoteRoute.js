const authenticateToken = require('../middleware/authMiddleware.js');

module.exports = (server) => {

    const {createQuote, deleteQuote, getQuotes} = require("../controllers/crudQuoteController.js");

    server
        .get("/createQuote",authenticateToken, createQuote)
        .get("/deleteQuote",authenticateToken, deleteQuote)
        // .get("/updateQuote",authenticateToken, updateQuote)
        .get("/getQuotes",authenticateToken, getQuotes)
        // .get("/getQuoteByid",authenticateToken, getQuoteById)
}