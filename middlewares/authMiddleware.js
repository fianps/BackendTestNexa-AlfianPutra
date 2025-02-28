const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token tidak tersedia' });
  }

  const tokenParts = authHeader.split(' ');
  const token = tokenParts.length === 2 && tokenParts[0] === 'Bearer' ? tokenParts[1] : authHeader;

  jwt.verify(token, 'nexatest', (err, decoded) => {
    if (err) return res.status(401).json({ error: 'Token tidak valid' });
    req.user = decoded;
    next();
  });
};
