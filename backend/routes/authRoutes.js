const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readData } = require('../utils/fileHandler');

// POST /api/auth/login -> admin girişi
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Kullanıcı adı ve şifre gerekli.' });
  }

  const admin = readData('admin.json');

  if (username !== admin.username) {
    return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı.' });
  }

  const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Kullanıcı adı veya şifre hatalı.' });
  }

  const token = jwt.sign(
    { username: admin.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
});

module.exports = router;