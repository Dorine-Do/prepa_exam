const { getConnection } = require('../services/connectServiceDatabase');

exports.getRandomQuote = async (req, res) => {
  
  const conn = await getConnection();
  await conn.query("USE birthdayApp");

  const TODAYS_QUOTE =  await conn.query(
    "SELECT * FROM quotes"
  );
  console.log(TODAYS_QUOTE)

  res.json({ ...TODAYS_QUOTE });
};
