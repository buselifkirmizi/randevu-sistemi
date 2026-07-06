const express = require ('express');
const cross = require('cors'); // backend ve frontendin farklı portlarda çalışmasına rağmen konuşmasını sağlıyo
require('dotenv').config(); // .env dosyasındaki değişkenleri process.env içine al
const app = express();
app.use(cross());
app.use(express.json());
app.get('/',(req,res)=>{
  res.json({message: 'Backend çalışıyor!'});
})
// '/' adresine get geldiğinde çalışır. mesaj test amaçlı
const serviceRoutes = require ('./routes/serviceRoutes');
app.use('/api/services', serviceRoutes); // /api/services ile başlayan route'lar serviceRoutes dosyasına yönlendirilecek
 const appoimentRoutes = require ('./routes/appointmentRoutes');
 app.use('/api/appointments', appoimentRoutes);
 const authRoutes = require ('./routes/authRoutes');
 app.use('/api/auth', authRoutes);
 const PORT = process.env.PORT || 5000;

 app.listen(PORT, () =>{
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
 });
