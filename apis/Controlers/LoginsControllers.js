const express = require('express');
const bcrypt = require('bcrypt');
const sql = require('mssql/msnodesqlv8');
const jwt = require('jsonwebtoken');

const sendMail = require('../services/sendmail');
const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=child;Trusted_Connection=true;'
};

module.exports = {
  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query(`SELECT * FROM users WHERE username = '${username}'`);

      if (result.recordset.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const user = result.recordset[0];
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, 'your_secret_key');
      return res.status(200).json({ success: true, message: 'Successfully logged in', token, username: user.username });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  },

  signup: async (req, res) => {
    const user = req.body;
    const saltRounds = 8;

    try {
      const pool = await sql.connect(config);
      const hashedPwd = await bcrypt.hash(user.password, saltRounds);
      const result = await pool.request()
        .input('fname', user.fname)
        .input('lname', user.lname)
        .input('username', user.username)
        .input('email', user.email)
        .input('password', hashedPwd)
        .execute('createuser');

      await sendMail(user.email);
      return res.status(201).send({ message: 'Signup successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: 'Server error' });
    }
  },

  changepassword: async (req, res) => {
    const { username, newpassword } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.request()
        .input('username', username)
        .query('SELECT userid, email, username, password FROM users WHERE username = @username');

      if (result.recordset.length === 0) {
        return res.status(400).json({ message: "User not found" });
      }

      const user = result.recordset[0];
      const validPassword = await bcrypt.compare(newpassword, user.password);

      if (validPassword) {
        const hashedNewPwd = await bcrypt.hash(newpassword, 8);
        await pool.request()
          .input('password', hashedNewPwd)
          .input('userid', user.userid)
          .query('UPDATE users SET password = @password WHERE userid = @userid');

        return res.status(200).json({ message: "Password changed successfully" });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error processing request" });
    }
  }
};
