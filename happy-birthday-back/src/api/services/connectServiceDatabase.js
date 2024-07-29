const mariadb = require('mariadb');

// Configuration de la connexion à la base de données
const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  connectionLimit: 5
});

async function getConnection() {
  return await pool.getConnection();
}

async function initializeDatabase() {
  let conn;
  try {
    conn = await getConnection();
    await conn.query("CREATE DATABASE IF NOT EXISTS birthdayApp");
    await conn.query("USE birthdayApp");
    await conn.query(`CREATE TABLE IF NOT EXISTS students (
      id INT PRIMARY KEY AUTO_INCREMENT,
      birthday DATE,
      lastname VARCHAR(255),
      firstname VARCHAR(255),
      email VARCHAR(255)
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS intervenants (
      id INT PRIMARY KEY AUTO_INCREMENT,
      birthday DATE,
      lastname VARCHAR(255),
      firstname VARCHAR(255),
      email VARCHAR(255)
    )`);
    await conn.query(`CREATE TABLE IF NOT EXISTS quotes (
        id INT PRIMARY KEY AUTO_INCREMENT,
        quote TEXT,
        author VARCHAR(255)
      )`);
    console.log("Base de données et table créées.");
  } catch (err) {
    console.error(err);
  } finally {
    if (conn) conn.end();
  }
}

module.exports = {
  pool,
  getConnection,
  initializeDatabase
};

