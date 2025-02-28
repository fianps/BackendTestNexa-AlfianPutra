const mysql = require('mysql2/promise');

const pool = require('../config/db');

exports.registerKaryawan = async (req, res) => {
  const { nama, alamat, gend, tgl_lahir, photo } = req.body;
  if (!nama || !alamat || !gend || !tgl_lahir || !photo) {
    return res.status(400).json({ error: 'Semua field wajib diisi' });
  }

  try {
    // Menghitung nilai baru
    const [maxResult] = await pool.execute('SELECT IFNULL(MAX(id), 0) as maxId FROM karyawan');
    const new_id = maxResult[0].maxId + 1;

    // Generate Nip
    const year = new Date().getFullYear();
    const [result] = await pool.execute("SELECT COUNT(*) as count FROM karyawan WHERE nip LIKE CONCAT(?, '%')", [year]);
    const counter = result[0].count + 1;
    const nip = year.toString() + counter.toString().padStart(4, '0');

    await pool.execute('INSERT INTO karyawan (id, nip, nama, alamat, gend, tgl_lahir, photo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [new_id, nip, nama, alamat, gend, tgl_lahir, photo, 1]);

    return res.json({ message: 'Karyawan berhasil didaftarkan', nip });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Gagal mendaftarkan karyawan' });
  }
};

exports.listKaryawan = async (req, res) => {
  const { keyword = '', start = 0, count = 10 } = req.query;

  try {
    const [rows] = await pool.execute('SELECT * FROM karyawan WHERE nama LIKE ? LIMIT ?, ?', [`%${keyword}%`, parseInt(start), parseInt(count)]);

    // await pool.end();
    return res.json({ data: rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Gagal mendapatkan data karyawan' });
  }
};

exports.updateKaryawan = async (req, res) => {
  const { nip, nama, alamat, gend, tgl_lahir, photo } = req.body;
  if (!nip) {
    return res.status(400).json({ error: 'NIP wajib disediakan' });
  }

  try {
    await pool.execute('UPDATE karyawan SET nama = ?, alamat = ?, gend = ?, tgl_lahir = ?, photo = ? WHERE nip = ?', [nama, alamat, gend, tgl_lahir, photo, nip]);

    // await pool.end();
    return res.json({ message: 'Data karyawan berhasil diupdate' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Gagal mengupdate data karyawan' });
  }
};

exports.disableKaryawan = async (req, res) => {
  const { nip } = req.body;
  if (!nip) {
    return res.status(400).json({ error: 'NIP wajib disediakan' });
  }

  try {
    await pool.execute('UPDATE karyawan SET status = 9 WHERE nip = ?', [nip]);

    // await pool.end();
    return res.json({ message: 'Karyawan berhasil dinonaktifkan' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Gagal menonaktifkan karyawan' });
  }
};
