const bcrypt = require('bcryptjs');
const { query } = require('../db'); 

module.exports = {
  GetAllUsers: async (req, res) => {
    try {
      const users = await query('SELECT * FROM Users');
      res.status(200).json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).send('Error fetching users');
    }
  },

  CreateNewUser: async (req, res) => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      await query(
        'INSERT INTO Users (Username, Email, PasswordHash) VALUES (?, ?, ?)',
        [username, email, hashedPassword]
      );
      res.status(201).send('User added successfully');
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Error creating user');
    }
  },

  DeleteUser: async (req, res) => {
    const { UserId } = req.params;
    try {
      const result = await query('DELETE FROM Users WHERE UserId = ?', [UserId]);
      if (result.affectedRows > 0) {
        res.send('User deleted successfully');
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      console.error('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    }
  },
};
