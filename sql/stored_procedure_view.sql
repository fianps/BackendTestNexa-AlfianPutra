USE gmedia_democase;

DROP PROCEDURE IF EXISTS sp_add_kary_alfianps;
DELIMITER //

CREATE PROCEDURE sp_add_kary_alfianps(
    IN p_nama VARCHAR(255),
    IN p_alamat VARCHAR(255),
    IN p_gend CHAR(1),
    IN p_tgl_lahir DATE,
    IN p_photo TEXT,
    OUT p_status VARCHAR(10)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        INSERT INTO log_trx_api (message, status, created_at)
          VALUES ('Error inserting karyawan', 'FAILED', NOW());
        SET p_status = 'FAILED';
    END;
    
    START TRANSACTION;
    
    SET @new_id = (SELECT IFNULL(MAX(id), 0) + 1 FROM karyawan);
    
    SET @year = YEAR(CURDATE());
    SET @counter = (SELECT IFNULL(MAX(CAST(SUBSTRING(nip, 5) AS UNSIGNED)), 0) + 1 
                    FROM karyawan 
                    WHERE nip LIKE CONCAT(@year, '%'));
    SET @nip = CONCAT(@year, LPAD(@counter, 4, '0'));
    
    INSERT INTO karyawan (id, nip, nama, alamat, gend, tgl_lahir, photo, status)
      VALUES (@new_id, @nip, p_nama, p_alamat, p_gend, p_tgl_lahir, p_photo, 1);
      
    INSERT INTO log_trx_api (message, status, created_at)
      VALUES ('Karyawan added successfully', 'SUCCESS', NOW());
    
    COMMIT;
    SET p_status = 'SUCCESS';
END //
DELIMITER ;

DROP VIEW IF EXISTS karyawan_alfianps;

CREATE VIEW karyawan_alfianps AS
SELECT 
  k.nip,
  k.nama,
  k.alamat,
  CASE
    WHEN k.gend = 'L' THEN 'Laki - Laki'
    WHEN k.gend = 'P' THEN 'Perempuan'
    ELSE 'Tidak Diketahui'
  END AS gend,
  DATE_FORMAT(k.tgl_lahir, '%e %M %Y') AS `Tanggal Lahir`
FROM karyawan k;
