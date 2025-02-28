# Backend Test Nexa - Alfian Putra

Proyek ini merupakan implementasi tes backend engineer yang mencakup API menggunakan Express.js dan MySQL. Fitur utama meliputi:

- **Otentikasi dengan JWT**: Menghasilkan token dengan enkripsi AES menggunakan key `nexatest`.
- **Pendaftaran Karyawan**: Menambahkan data karyawan dengan penanganan manual untuk kolom `id` dan pembuatan `nip` otomatis.
- **List, Update, dan Nonaktifkan Karyawan**: Endpoint untuk mendapatkan daftar karyawan dengan pencarian dan pagination, update data karyawan berdasarkan `nip`, serta nonaktifkan karyawan (ubah status dari 1 ke 9).
- **Stored Procedure dan View**: File SQL (`stored_procedure_view.sql`) mencakup stored procedure untuk menambah karyawan (beserta pencatatan log) dan view untuk menampilkan data karyawan.

## Daftar Isi

- [Persyaratan](#persyaratan)
- [Setup Proyek](#setup-proyek)
  - [1. Clone Repository](#1-clone-repository)
  - [2. Instalasi Dependensi](#2-instalasi-dependensi)
  - [3. Testing](#3-menjalankan-aplikasi-dengan-docker)
- [API Endpoints](#api-endpoints)

## Setup Proyek

### 1. Clone Repository

Clone repository ini ke lokal:
```bash
git clone https://github.com/username/BackendTestNexa-NamaAnda.git
cd BackendTestNexa-AlfianPutra
```

### 2. Instalasi Dependensi
```bash
npm install
```

### 3. Testing
#### 1. Build Image
```bash
docker build -t backend-test .
```
#### 2. Running Container
```bash
docker run -p 3000:3000 backend-test
```

## API Endpoints
### Otentikasi
- **GET /api/auth/token**
  (Endpoint ini menghasilkan token testing. Pastikan token dihasilkan sesuai dengan kebutuhan.)
- **POST /api/auth/login**
  (Jika diimplementasikan, endpoint login akan menghasilkan token berdasarkan validasi data di tabel admin.)

### Otentikasi
- **POST /api/karyawan/register**
  Registrasi karyawan baru.
  ```bash
  {
  "nama": "Budi Santoso",
  "alamat": "Jl. Contoh No. 123",
  "gend": "L",
  "tgl_lahir": "1990-05-20",
  "photo": "data:image/png;base64,..."
  }
  ```
- **GET /api/karyawan?keyword=&start=&count=**
  Mengambil daftar karyawan dengan pencarian berdasarkan nama dan pagination.
- **PUT /api/karyawan/update**
  Update data karyawan berdasarkan nip.
  ```bash
  {
  "nip": "20230001",
  "nama": "Budi Santoso Updated",
  "alamat": "Jl. Updated No. 123",
  "gend": "L",
  "tgl_lahir": "1990-05-20",
  "photo": "data:image/png;base64,..."
  }
  ```
- **DELETE /api/karyawan/disable**
  Nonaktifkan karyawan dengan mengubah status dari 1 ke 9.
  ```bash
  {
  "nip": "20230001"
  }
  ```
