const express = require('express');
const bcrypt =  require('bcryptjs')
const sql = require('mssql');
const jwt = require('jsonwebtoken');


var config = {
 
  server: 'DESKTOP-5TSB55R\\SQLEXPRESS',
  database: 'Taekwondo',
  options: {
      trustedConnection: true,
      connectionTimeout: 30000
  }
};

var conn = new sql.ConnectionPool(config);
conn.connect(function(err) {
  if (err) console.log(err);
});



module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const pool = await sql.connect(conn);
      const result = await pool.request().input('email', sql.VarChar, email).query('SELECT * FROM Users WHERE email = @email');
      const user = result.recordset[0];

      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const isMatch = bcrypt.compareSync(password, user.PasswordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const token = jwt.sign({ userId: user.UserId, email: user.Email }, process.env.SECRET_KEY, {
        expiresIn: '1h',
      });

      return res.status(200).json({
        message: "Login successful",
        token: token,
        userId: user.UserId
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  },

  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const pool = await sql.connect(conn);
      const result = await pool.request().input('username', sql.VarChar, username).query('SELECT * FROM Users WHERE Username = @username');
      if (result.recordset.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const PasswordHash = bcrypt.hashSync(password, salt);

      await pool.request()
        .input('username', sql.VarChar, username)
        .input('email', sql.VarChar, email)
        .input('passwordHash', sql.VarChar, PasswordHash)
        .query('INSERT INTO Users (Username, Email, PasswordHash) VALUES (@username, @email, @passwordHash)');

      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  },

  changepassword: async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
      const pool = await sql.connect(conn);
      const result = await pool.request().input('email', sql.VarChar, email).query('SELECT * FROM Users WHERE Email = @email');
      const user = result.recordset[0];

      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }

      const isMatch = bcrypt.compareSync(oldPassword, user.PasswordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid old password" });
      }

      const salt = bcrypt.genSaltSync(10);
      const newHash = bcrypt.hashSync(newPassword, salt);

      await pool.request()
        .input('email', sql.VarChar, email)
        .input('newHash', sql.VarChar, newHash)
        .query('UPDATE Users SET PasswordHash = @newHash WHERE Email = @email');

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error" });
    }
  }
};

// module.exports = {
//   login: async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const pool =  sql.connect(conn);
//       if (pool.connected) {
//         const result = await pool.request().query`SELECT * FROM Users WHERE email = ${email}`;
//         const user = result.recordset[0];
  
//         if (!user) {
//           return res.status(400).json({ message: "Invalid username or password" });
//         }
  
//         const isMatch = bcrypt.compareSync(password, user.PasswordHash);
//         if (!isMatch) {
//           return res.status(400).json({ message: "Invalid username or password" });
//         }
  
        
//         const token = jwt.sign({ userId: user.UserId, email: user.Email }, 'your_secret_key', {
//           expiresIn: '1h', 
//         });
  
       
//         return res.status(200).json({
//           message: "Login successful",
//           token: token,  
//           userId: user.UserId
//         });
//       } else {
//         return res.status(500).json({ message: "Database connection failed" });
//       }
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({ message: "Server error" });
//     }
//   },

//   signup: async (req, res) => {
//       const { username, email, password } = req.body;
//       try {
//         const pool =sql.connect(conn);
//         if (pool.connected) {
//           const user = await pool.request().query`SELECT * FROM Users WHERE Username = ${username}`;
//           if (user.recordset.length > 0) {
//             return res.status(400).json({ message: "User already exists" });
//           } else {
//             const salt = bcrypt.genSaltSync(10);
//             const PasswordHash = bcrypt.hashSync(password, salt);
    
//             await pool.request().query`INSERT INTO Users (Username, Email, PasswordHash) VALUES (${username}, ${email}, ${PasswordHash})`;
//             return res.status(201).json({ message: "User created successfully" });
//           }
//         } else {
//           return res.status(500).json({ message: "Database connection failed" });
//         }
//       } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: error.message });
//       }
//     },

//   changepassword: async (req, res) => {
//     const { email } = req.body;
  
//     try {
//       const result = await sql.query`SELECT * FROM Users WHERE Email = ${email}`;
//       const user = result.recordset[0];
  
//       if (!user) {
//         return res.status(400).json({ message: "Email not found" });
//       }
  
//       const resetToken = "123456"; 
  
//       res.status(200).json({ message: "Reset link sent to your email address" });
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: "Server error" });
//     }
//   }}