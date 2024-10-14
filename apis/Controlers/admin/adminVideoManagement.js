const sql = require('mssql');
const config = {
    connectionString: 'Driver=SQL Server;Server="DESKTOP-5TSB55R\\SQLEXPRESS";Database=Taekwondo;Trusted_Connection=true;'
  };

module.exports = {
 SaveVideo: async (req, res) => {
  const { title, description, videoUrl, category } = req.body;
  try {
    let pool = await sql.connect(config);
    await pool.request()
      .input('title', sql.NVarChar, title)
      .input('description', sql.NVarChar, description)
      .input('videoUrl', sql.NVarChar, videoUrl)
      .input('category', sql.NVarChar, category)
      .query('INSERT INTO Videos (title, description, videoUrl, category) VALUES (@title, @description, @videoUrl, @category)');
    
    res.status(201).send('Video saved successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
}

};



