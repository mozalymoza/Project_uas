const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(cors())


const bodyPs = require('body-parser');
app.use(bodyPs.urlencoded({ extended: false}));
app.use(bodyPs.json());


//import routes kamar
const kamarRouter = require('./routes/kamar');
app.use('/api/kamar',kamarRouter);

//import routes Tamu
const tamuRouter = require('./routes/tamu');
app.use('/api/tamu',tamuRouter);


//import routes fasilitas
const fasilitas_hotelRouter = require('./routes/fasilitas_hotel');
app.use('/api/fasilitas',fasilitas_hotelRouter);


//import routes pemesanan
const pemesananRouter = require('./routes/pemesanan');
app.use('/api/pemesanan',pemesananRouter);

//import routes hotel
const hotelRouter = require('./routes/hotel');
app.use('/api/hotel',hotelRouter);


app.listen(port,() => {
    console.log(`aplikasi berjalan di http::localhost:${port}`)
})
