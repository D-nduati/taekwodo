const { query } = require('./db'); 

module.exports = {
  // Get user settings by ID
  GetUserSettings: async (req, res) => {
    const { userId } = req.params;

    try {
      const result = await query(`SELECT * FROM UserSettings WHERE UserID = ?`, [userId]);

      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(304).json({ message: "No settings Yet" });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user settings', error: err.message });
    }
  },

  // Update user settings
  UpdateUserSettings: async (req, res) => {
    const { userId } = req.params;
    const {
      username,
      email,
      passwordHash,
      receiveEmails,
      receiveNotifications,
      theme,
      twoFactorAuth,
      avatarUrl,
    } = req.body;

    try {
      const result = await query(
        `UPDATE UserSettings 
         SET Username = ?, 
             Email = ?, 
             PasswordHash = ?, 
             ReceiveEmails = ?, 
             ReceiveNotifications = ?, 
             Theme = ?, 
             TwoFactorAuth = ?, 
             AvatarUrl = ?
         WHERE UserID = ?`,
        [
          username,
          email,
          passwordHash,
          receiveEmails,
          receiveNotifications,
          theme,
          twoFactorAuth,
          avatarUrl,
          userId,
        ]
      );

      if (result.affectedRows > 0) {
        res.json({ success:'ok',message: 'User settings updated successfully' });
      } else {
        res.status(304).json({ message: 'User settings not found',results:[result] });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error updating user settings', error: err.message });
    }
  },

  // Change only avatar
  ChangeAvatar: async (req, res) => {
    const { userId } = req.params;
    const { avatarUrl } = req.body;

    try {
      const result = await query(
        `UPDATE UserSettings SET AvatarUrl = ? WHERE UserID = ?`,
        [avatarUrl, userId]
      );

      if (result.affectedRows > 0) {
        res.json({ message: 'Avatar updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error updating avatar', error: err.message });
    }
  },

  // Toggle 2FA
  ToggleTwoFactorAuth: async (req, res) => {
    const { userId } = req.params;
    const { twoFactorAuth } = req.body;

    try {
      const result = await query(
        `UPDATE UserSettings SET TwoFactorAuth = ? WHERE UserID = ?`,
        [twoFactorAuth, userId]
      );

      if (result.affectedRows > 0) {
        res.json({
          message: `Two-Factor Authentication ${
            twoFactorAuth ? 'enabled' : 'disabled'
          } successfully`,
        });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error toggling 2FA', error: err.message });
    }
  },
};
