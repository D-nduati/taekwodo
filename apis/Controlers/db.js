const mysql = require('mysql');

// Create MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Dee2222',
  database: 'Taekwondo',
});

// Export a promisified query function
const query = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) return reject(err);
      connection.query(sql, params, (err, results) => {
        connection.release();
        if (err) return reject(err);
        resolve(results);
      });
    });
  });
};

module.exports = {
  query,
};
