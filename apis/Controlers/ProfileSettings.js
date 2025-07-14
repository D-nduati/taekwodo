const { query } = require('./db.js'); // adjust path to your db.js

module.exports = {
  // GET profile data
  GetProfileData: async (req, res) => {
    try {
      const userId = req.query.userId;
      const result = await query(`SELECT * FROM Profiles WHERE UserId = ?`, [userId]);

      if (result.length > 0) {
        const profile = result[0];
        res.json({
          username: profile.Username,
          role: profile.Role,
          avatarUrl: profile.AvatarUrl,
          achievements: JSON.parse(profile.Achievements || '[]'),
          skills: JSON.parse(profile.Skills || '[]'),
        });
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  // UPDATE profile data
  UpdateProfile: async (req, res) => {
    try {
      const { userId, username, role, avatarUrl, achievements, skills } = req.body;

      const result = await query(
        `UPDATE Profiles 
         SET 
           Username = ?, 
           Role = ?, 
           AvatarUrl = ?, 
           Achievements = ?, 
           Skills = ?, 
           UpdatedAt = CURRENT_TIMESTAMP 
         WHERE UserId = ?`,
        [
          username,
          role,
          avatarUrl,
          JSON.stringify(achievements || []),
          JSON.stringify(skills || []),
          userId,
        ]
      );

      if (result.affectedRows > 0) {
        res.json({ message: 'Profile updated successfully' });
      } else {
        res.status(404).json({ message: 'Profile not found' });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },
};
