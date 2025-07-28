const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { query } = require('./db');

const { SendMailController, ForgotPasswordEmail } = require('./SendMail');


require('dotenv').config();

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const results = await query('SELECT * FROM Users WHERE Email = ?', [email]);
      const user = results[0];

      if (!user) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const isMatch = bcrypt.compareSync(password, user.PasswordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        { userId: user.UserId, email: user.Email },
        process.env.SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        userId: user.UserId
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  signup: async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const existingUser = await query('SELECT * FROM Users WHERE Username = ? OR Email = ?', [username, email]);

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);

      await query(
        'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)',
        [username, email, passwordHash]
      );

      if (username && email && password) {
        await SendMailController(username, email, password)
      }

      return res.status(201).json({ message: "User created successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  changepassword: async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;

    try {
      const results = await query('SELECT * FROM Users WHERE Email = ?', [email]);
      const user = results[0];

      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }

      const isMatch = bcrypt.compareSync(oldPassword, user.PasswordHash);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid old password" });
      }

      const isSamePassword = bcrypt.compareSync(newPassword, user.PasswordHash);
      if (isSamePassword) {
        return res.status(400).json({ message: "New password cannot be the same as the old password." });
      }

      const salt = bcrypt.genSaltSync(10);
      const newHash = bcrypt.hashSync(newPassword, salt);

      await query('UPDATE Users SET PasswordHash = ? WHERE Email = ?', [newHash, email]);

      return res.status(200).json({ message: "Password changed successfully" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  },



  forgotPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const results = await query('SELECT * FROM Users WHERE Email = ?', [email]);
      const user = results[0];

      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }

      function generatePassword(length = 10) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
      }

      const tempPassword = generatePassword(12);
      const salt = bcrypt.genSaltSync(10);
      const newHash = bcrypt.hashSync(tempPassword, salt);

      const result = await query('UPDATE Users SET PasswordHash = ? WHERE Email = ?', [newHash, email]);

      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "Failed to update password." });
      }
      await ForgotPasswordEmail(email, tempPassword);

      return res.status(200).json({ message: "Password reset email sent" });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  }

};
