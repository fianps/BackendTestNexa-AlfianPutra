const express = require('express');
const router = express.Router();
const karyawanController = require('../controllers/karyawanController');
const authMiddleware = require('../middlewares/authMiddleware');

// Semua endpoint karyawan menggunakan middleware verifikasi token
router.use(authMiddleware.verifyToken);

router.post('/register', karyawanController.registerKaryawan);
router.get('/', karyawanController.listKaryawan);
router.put('/update', karyawanController.updateKaryawan);
router.delete('/disable', karyawanController.disableKaryawan);

module.exports = router;
