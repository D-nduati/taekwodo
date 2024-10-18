const sql = require('mssql/msnodesqlv8');

const config = {
    connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;'
  };

module.exports = {
GetRankings:  async (req, res) => {
    try {
        const pool = await sql.connect(config);
        const result = await pool.request().query(`
            SELECT 
                u.UserId,
                u.Username,
                p.AvatarUrl,
                us.Score,
                us.Rank
            FROM 
                UserScores us
            JOIN 
                Users u ON us.UserID = u.UserId
            LEFT JOIN 
                Profiles p ON u.UserId = p.UserId
            ORDER BY 
                us.Rank ASC
        `);
        
        res.status(200).json(result.recordset); 
    } catch (err) {
        console.error('Error fetching rankings:', err);
        res.status(500).json({ message: 'Server error' });
    }
}
};


// app.get('/api/rankings',


