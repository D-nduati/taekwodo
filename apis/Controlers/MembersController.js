const sql = require('mssql');

const config = {
  connectionString: 'Driver=SQL Server;Server=DESKTOP-5TSB55R\\SQLEXPRESS;Database=Taekwondo;Trusted_Connection=true;',
};

module.exports = {
  GetAllPosts: async (req, res) => {
    try {
      const pool = await sql.connect(config);
      if (pool.connected) {
        const postsQuery = `SELECT p.Id, p.Author, p.Content, p.ImageUrl, p.VideoUrl, p.CreatedAt,
                                   ISNULL(l.LikeCount, 0) AS Likes
                            FROM Posts p
                            LEFT JOIN (SELECT Id, COUNT(*) AS LikeCount FROM Likes GROUP BY Id) l
                            ON p.Id = l.Id`;

        const posts = await pool.query(postsQuery);

        const commentsQuery = `SELECT * FROM Comments WHERE Id IN (SELECT Id FROM Posts)`;
        const comments = await pool.query(commentsQuery);

        const postsWithComments = posts.recordset.map(post => ({
          ...post,
          comments: comments.recordset.filter(comment => comment.Id === post.Id),
        }));

        res.json(postsWithComments);
      } else {
        res.status(500).json({ message: 'Error connecting to the database' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
    }
  },


  CreatePost: async (req, res) => {
    const { author, content, imageUrl, videoUrl } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        INSERT INTO Posts (Author, Content, ImageUrl, VideoUrl, CreatedAt)
        VALUES (${author}, ${content}, ${imageUrl}, ${videoUrl}, GETDATE());
        SELECT * FROM Posts WHERE Id = SCOPE_IDENTITY();
      `;

      res.status(201).json(result.recordset[0]);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  
  UpdatePost: async (req, res) => {
    const { content, imageUrl, videoUrl } = req.body;
    const { id } = req.params;

    try {
      const pool = await sql.connect(config);
      if (pool.connected) {
        const result = await pool.query`
          UPDATE Posts 
          SET Content = ${content}, ImageUrl = ${imageUrl}, VideoUrl = ${videoUrl} 
          WHERE Id = ${id};
        `;

        if (result.rowsAffected[0] > 0) {
          res.status(204).json({ message: 'Post updated successfully' });
        } else {
          res.status(404).json({ message: 'Post not found' });
        }
      } else {
        res.status(500).json({ message: 'Error connecting to the database' });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },


  DeletePost: async (req, res) => {
    const { id } = req.params;

    try {
      const pool = await sql.connect(config);
      await pool.query`
        DELETE FROM Posts
        WHERE Id = ${id};
      `;

      res.json({ status: 'ok', message: 'Successfully deleted post' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },


  LikePost: async (req, res) => {
    const { Id } = req.params;
    const { likedBy } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        INSERT INTO Likes (Id, LikedBy, CreatedAt)
        VALUES (${Id}, ${likedBy}, GETDATE());
      `;

      res.json({ message: 'Post liked successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error liking post', error: err.message });
    }
  },

 
  AddComment: async (req, res) => {
    const { Id } = req.params;
    const { author, content } = req.body;

    try {
      const pool = await sql.connect(config);
      const result = await pool.query`
        INSERT INTO Comments (Id, Author, Content, CreatedAt)
        VALUES (${Id}, ${author}, ${content}, GETDATE());
      `;

      res.json({ message: 'Comment added successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error adding comment', error: err.message });
    }
  },
};
