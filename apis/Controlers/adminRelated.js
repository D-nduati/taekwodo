const bcrypt =  require('bcryptjs')
const sql = require('mssql/msnodesqlv8');
const jwt = require('jsonwebtoken');

const config = {
    connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;'
  };
  module.exports = {
    GetAllUsers:async (req, res) => {
        try {
            const pool = await sql.connect(config);
            const result = await pool.request().query('SELECT * FROM Users');
            res.status(200).json(result.recordset);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },
    CreateNewUser: async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const pool = await sql.connect(config); 
            const hashedPassword = await bcrypt.hash(password, 10);
            await pool
      .request()
      .input('Username', sql.NVarChar, username)
      .input('Email', sql.NVarChar, email)
      .input('PasswordHash', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Users (Username, Email, PasswordHash) VALUES (@Username, @Email, @PasswordHash)');
    
      res.status(201).send('User added successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
    },

    DeleteUser: async (req, res) => {
    const userId = req.params.id;
    try {
        const pool =  await sql.connect(config); ;
        await pool.request().input('UserId', sql.Int, userId).query('DELETE FROM Users WHERE UserId = @UserId');
        res.send('User deleted successfully');
      } catch (err) {
        res.status(500).send(err.message);
      }
    },
  };



  

