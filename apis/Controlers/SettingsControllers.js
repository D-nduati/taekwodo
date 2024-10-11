const sql = require('mssql');

const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;',
};

module.exports = {
 
  GetUserSettings: async (req, res) => {
    const { userId } = req.params;  

    try {
      const pool = await sql.connect(config);
      if (pool.connected) {
        const result = await pool.query`
          SELECT * FROM UserSettings WHERE UserID = ${userId};
        `;

        if (result.recordset.length > 0) {
          res.json(result.recordset[0]);
        } else {
          res.status(404).json({ message: 'User settings not found' });
        }
      } else {
        res.status(500).json({ message: 'Error connecting to the database' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user settings', error: err.message });
    }
  },

 
  UpdateUserSettings: async (req, res) => {
    const { userId } = req.params;
    const { username, email, passwordHash, receiveEmails, receiveNotifications, theme, twoFactorAuth, avatarUrl } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        UPDATE UserSettings 
        SET Username = ${username}, 
            Email = ${email}, 
            PasswordHash = ${passwordHash}, 
            ReceiveEmails = ${receiveEmails}, 
            ReceiveNotifications = ${receiveNotifications}, 
            Theme = ${theme}, 
            TwoFactorAuth = ${twoFactorAuth}, 
            AvatarUrl = ${avatarUrl},
            UpdatedAt = GETDATE()
        WHERE UserID = ${userId};
      `;

      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'User settings updated successfully' });
      } else {
        res.status(404).json({ message: 'User settings not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error updating user settings', error: err.message });
    }
  },

 
  ChangeAvatar: async (req, res) => {
    const { userId } = req.params;
    const { avatarUrl } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        UPDATE UserSettings 
        SET AvatarUrl = ${avatarUrl}, UpdatedAt = GETDATE()
        WHERE UserID = ${userId};
      `;

      if (result.rowsAffected[0] > 0) {
        res.json({ message: 'Avatar updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error updating avatar', error: err.message });
    }
  },

  
  ToggleTwoFactorAuth: async (req, res) => {
    const { userId } = req.params;
    const { twoFactorAuth } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        UPDATE UserSettings 
        SET TwoFactorAuth = ${twoFactorAuth}, UpdatedAt = GETDATE()
        WHERE UserID = ${userId};
      `;

      if (result.rowsAffected[0] > 0) {
        res.json({ message: `Two-Factor Authentication ${twoFactorAuth ? 'enabled' : 'disabled'} successfully` });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error toggling 2FA', error: err.message });
    }
  },
};
