const { getConnection } = require('../services/connectServiceDatabase');
const { DateTime } = require("luxon");

exports.getRandomQuote = async (req, res) => {
  
  const conn = await getConnection();
  await conn.query("USE birthdayApp");

  const quote =  await conn.query(
    "SELECT * FROM quotes ORDER BY RAND() LIMIT 1"
  );

  res.json(quote)
            

  // const today = DateTime.now();
  // // Convertissez cette date en un nombre (ex: YYYYMMDD) pour assurer l'unicité par jour
  // const dateNumber = parseInt(today.toFormat('yyyyMMdd'));
  // // Utilisez le nombre obtenu pour sélectionner une citation de manière cyclique
  // const quoteIndex = dateNumber % quotes.length;

  // res.json(quotes[quoteIndex]);
};
