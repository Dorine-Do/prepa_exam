const { initializeDatabase, getConnection } = require('../services/connectServiceDatabase');
const fs = require('fs');
const csv = require('csv-parser');

exports.postCsvStudentsToDatabase = async (req, res) => {
  try {
    // Initialiser la base de données si nécessaire
    await initializeDatabase();

    // Connexion à la base de données
    const conn = await getConnection();
    await conn.query("USE birthdayApp");

    // Lire et importer le fichier CSV
    fs.createReadStream('data/students.csv')  // Remplacez par le chemin correct du fichier
      .pipe(csv({ separator: ';' }))
      .on('data', async (row) => {
        try {
          const { birthday, lastname, firstname, email } = row;
          const formattedDate = new Date(birthday.split('/').reverse().join('-'));
          await conn.query(
            "INSERT INTO students (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)",
            [formattedDate, lastname, firstname, email]
          );
        } catch (err) {
          console.error('Erreur lors de l\'insertion de données :', err);
        }
      })
      .on('end', () => {
        console.log('Importation des données étudiants terminée.');
        res.status(200).json({ message: 'Importation des données étudiantes réussie.' });
      });

  }catch{
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'importation des données.' });
  }
};

exports.postCsvTeachersToDatabase = async (req, res) => {
  try {
    // Initialiser la base de données si nécessaire
    await initializeDatabase();

    // Connexion à la base de données
    const conn = await getConnection();
    await conn.query("USE birthdayApp");

    // Lire et importer le fichier CSV
    fs.createReadStream('data/intervenants.csv')  // Remplacez par le chemin correct du fichier
      .pipe(csv({ separator: ';' }))
      .on('data', async (row) => {
        console.log(row)
        try {
          const { birthday, lastname, firstname, email } = row;
          const formattedDate = new Date(birthday.split('/').reverse().join('-'));
          await conn.query(
            "INSERT INTO intervenants (birthday, lastname, firstname, email) VALUES (?, ?, ?, ?)",
            [formattedDate, lastname, firstname, email]
          );
        } catch (err) {
          console.error('Erreur lors de l\'insertion de données :', err);
        }
      })
      .on('end', () => {
        console.log('Importation des données intervenants terminée.');
        res.status(200).json({ message: 'Importation des données intervenants réussie.' });
      });

  }catch{
    console.error(err);
    res.status(500).json({ error: 'Erreur lors de l\'importation des données.' });
  }
};


exports.postCsvQuotesToDatabase = async (req, res) => {
    try {
      // Initialiser la base de données si nécessaire
      await initializeDatabase();
  
      // Connexion à la base de données
      const conn = await getConnection();
      await conn.query("USE birthdayApp");
  
      // Lire et importer le fichier CSV
      fs.createReadStream('data/quotes.csv')  // Remplacez par le chemin correct du fichier
        .pipe(csv({ separator: ';' }))
        .on('data', async (row) => {
          try {
            const { quote, author} = row;
            await conn.query(
              "INSERT INTO quotes (quote, author) VALUES (?, ?)",
              [quote, author]
            );
          } catch (err) {
            console.error('Erreur lors de l\'insertion de données :', err);
          }
        })
        .on('end', () => {
          console.log('Importation des données quotes terminée.');
          res.status(200).json({ message: 'Importation des données quotes réussie.' });
        });
  
    }catch{
      console.error(err);
      res.status(500).json({ error: 'Erreur lors de l\'importation des données.' });
    }
  };