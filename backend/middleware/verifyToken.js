const jwt = require('jsonwebtoken');// token doğrulama için
function verifyToken(req,res,next){
  //express middlware 3 paremetresi var: req gelen istek,res gönderilecek cevap,next sonraki adım
  const authHeader = req.headers.authorization;
  //glen isteğin headerından authorization alanını al
  if(!authHeader || !authHeader.startsWith('Bearer ')){
    return res.status(401).json({error: 'Yetkilendirme gerekli'});
}
const token = authHeader.split(' ')[1];//bwarer ve token ı seri gibi düşün [0]=bearer [1]=token yani tokenı al

try {
  const decoded = jwt.verify(token,process.env.JWT_SECRET);//token doğrulama
  req.admin = decoded;//çözülen tokenı isteğe ekler bu sayede route lerde req.admin ile erişebiliriz  

  next();

} catch (error) {
  return res.status(401).json({error: 'Geçersiz token'});
}//jwt başarısız olursa çalışır
}

module.exports = verifyToken;