const express = require('express');
const bodyParser = require('body-parser');

const authRoutes = require('./routes/auth');
const karyawanRoutes = require('./routes/karyawan');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint untuk otentikasi dan endpoint karyawan
app.use('/api/auth', authRoutes);
app.use('/api/karyawan', karyawanRoutes);

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
