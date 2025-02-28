const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const pool = require('../config/db');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username dan password wajib diisi' });
  }

  try {
    // Validasi user pada table admin
    const [rows] = await pool.execute('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Kredensial tidak valid' });
    }

    // string plaintext
    const timestamp = Date.now();
    const plainText = `${username}:${password}:${timestamp}`;

    // Menggunakan AES-128-ECB
    const algorithm = 'aes-128-ecb';
    const key = crypto.createHash('md5').update('nexatest').digest();
    const cipher = crypto.createCipheriv(algorithm, key, null);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    // payload JWT
    const payload = { data: encrypted };

    const token = jwt.sign(payload, 'nexatest', { expiresIn: '1h' });

    await pool.execute('INSERT INTO admin_token (username, token, created_at) VALUES (?, ?, NOW())', [username, token]);

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server' });
  }
};

exports.generateToken = async (req, res) => {
  // testing
  const username = 'testdata';
  const password = 'databaru';

  try {
    // kombinasi string
    const timestamp = Date.now();
    const plainText = `${username}:${password}:${timestamp}`;

    // Enkripsi
    const algorithm = 'aes-128-ecb';
    const key = crypto.createHash('md5').update('nexatest').digest();
    const cipher = crypto.createCipheriv(algorithm, key, null);
    let encrypted = cipher.update(plainText, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const payload = { data: encrypted };

    const token = jwt.sign(payload, 'nexatest', { expiresIn: '3h' });

    await pool.execute('INSERT INTO admin_token (token) VALUES (?)', [token]);

    return res.json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Terjadi kesalahan pada server saat membuat token' });
  }
};
