const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkilendirme gerekli.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // ileride route içinde kullanmak istersek erişebiliriz
    next(); // her şey tamam, route'a devam et
  } catch (error) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token.' });
  }
}

module.exports = verifyToken;