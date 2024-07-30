// routes/auth.js
module.exports = (server) => {

    const {signUp, login, checkAuth} = require("../controllers/authController.js");

    server
        .post("/signup", signUp)
        .post("/login", login)
        .post('/checkAuth',checkAuth )
}