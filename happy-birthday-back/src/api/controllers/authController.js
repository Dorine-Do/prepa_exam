const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getConnection } = require('../services/connectServiceDatabase');
const authenticateToken = require('../middleware/authMiddleware');

// Clé JWT
const secretKey = process.env.JWT_SECRET_KEY || 'ma_clef_secrete';

const bootdb = async () => {
  const conn =  await getConnection();
  await conn.query("USE birthdayApp");
  return conn;
}

// Inscription utilisateur **********************************************************************************************************************
exports.signUp = async (req, res) => {
    const { username, password, email } = req.body;

    const conn = await bootdb();
  
    // Vérifier si l'utilisateur existe déjà
    const userExists = await conn.query('SELECT * FROM users WHERE username = ?',[username])
    if (userExists.length !== 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
  
    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);
    // Enregistrer l'utilisateur
    conn.query('INSERT INTO users (username, password, email, role) VALUES (?,?,?,?)',[username, hashedPassword, email, 'admin'])
    
    // OK
    res.status(201).json({ message: 'User created' });

}

// Connexion utilisateur **********************************************************************************************************************
exports.login = async (req, res) => {
    const { username, password } = req.body;

    const conn = await bootdb();

    // Rechercher l'utilisateur
    const user = await conn.query('SELECT * FROM users WHERE username = ?',[username])
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
  
    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
  
    // Générer un token JWT
    const token = jwt.sign(
      { 
        username: user[0].username,
        role : user[0].role
      }, 
      secretKey,
      {
      expiresIn: '1h',
     }
  );
  
    // OK
    res.json({ message: 'Logged in successfully', token });
}

// Vérifie Auth utilisateur **********************************************************************************************************************
exports.checkAuth = async (req, res, next) => {
  authenticateToken(req, res, next)
} 
