const { query } = require('./db'); // Adjust path as needed

module.exports = {
  GetRankings: async (req, res) => {
    try {
      const sql = `
        SELECT 
          u.UserId,
          u.Username,
          p.AvatarUrl,
          us.Score,
          us.rank1 AS Rank
        FROM 
          UserScores us
        JOIN 
          Users u ON us.UserID = u.UserId
        LEFT JOIN 
          Profiles p ON u.UserId = p.UserId
        ORDER BY 
          us.rank1 ASC
      `;

      const result = await query(sql);
      res.status(200).json(result);
    } catch (err) {
      console.error('Error fetching rankings:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
};
