module.exports = (server) => {
    const {postCsvStudentsToDatabase, postCsvTeachersToDatabase ,postCsvQuotesToDatabase} = require("../controllers/csvToDatabaseController.js");

    server
        .get("/postCsvStudentsToDatabase", postCsvStudentsToDatabase)
        .get("/postCsvTeachersToDatabase", postCsvTeachersToDatabase)
        .get("/postCsvQuotesToDatabase", postCsvQuotesToDatabase)

}