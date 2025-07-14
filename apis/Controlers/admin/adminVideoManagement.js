// videoController.js
const { query } = require('../db'); 

module.exports = {
  SaveVideo: async (req, res) => {
    const {id, title, description, videoUrl, category } = req.body;
    try {
      await query(
        'INSERT INTO Videos (id,title, description, videoUrl, category) VALUES (?,?, ?, ?, ?)',
        [id,title, description, videoUrl, category]
      );
      res.status(201).send('Video saved successfully');
    } catch (err) {
      console.error('Error saving video:', err);
      res.status(500).send('Error saving video');
    }
  },

  GetVideos: async (req, res) => {
    try {
      const videos = await query('SELECT * FROM Videos');
      res.status(200).json(videos);
    } catch (err) {
      console.error('Error fetching videos:', err);
      res.status(500).send('Error fetching videos');
    }
  },
};
