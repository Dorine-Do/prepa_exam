// middlewares/auth
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  
      // Récup le headers
      const authHeader = req.headers['authorization'];

      let token;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.replace('Bearer ', '');
      }

      if (!token) {
        return res.sendStatus(401); // Unauthorized
      }

      try {
        const user = jwt.verify(token, 'ma_clef_secrete');
        req.user = user;

        if (user.role === 'admin') {
          next();
        }

      } catch (error) {
        res.sendStatus(403);
      }
 
}

module.exports = authenticateToken;
