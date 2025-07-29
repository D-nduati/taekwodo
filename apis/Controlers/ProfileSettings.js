const { query } = require('./db.js'); // adjust path to your db.js

module.exports = {
  // GET profile data
  GetProfileData: async (req, res) => {
    try {
      const { userId } = req.params;
      const result = await query(`SELECT * FROM Profiles WHERE UserId = ?`, [31]);
  
      if (result.length > 0) {
        const profile = result[0];
  
        const data = [{
          username: profile.Username,
          role: profile.Role,
          avatarUrl: profile.AvatarUrl,
          achievements: JSON.parse(profile.Achievements || '[]'),
          skills: JSON.parse(profile.Skills || '[]'),
        }];
  
        res.status(200).json(data);
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
      const { profileId, userId, username, role, avatarUrl, achievements, skills } = req.body;

      const result = await query(
        'INSERT INTO Profiles(ProfileId,UserId,Username ,Role ,AvatarUrl , Achievements , Skills )VALUES (?,?,?,?,?,?,?)',
        [
          profileId,
          userId,
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
