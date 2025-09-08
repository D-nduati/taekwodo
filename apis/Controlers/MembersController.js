const { query } = require('./db');
const { v4: uuidv4 } = require('uuid');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

module.exports = {
  // GET all posts with their comments and like count
  GetAllPosts: async (req, res) => {
    try {
      // Get all posts (with like count from Posts table)
      const posts = await query(`
        SELECT Id, Author, Content, ImageUrl, VideoUrl, Likes, CreatedAt
        FROM Posts ORDER BY CreatedAt DESC
      `);

      // Get all comments for all posts
      const comments = await query(`SELECT * FROM Comments`);

      // Attach comments to each post
      const postsWithComments = posts.map(post => ({
        ...post,
        comments: comments.filter(comment => comment.PostID === post.Id),
      }));

      res.json(postsWithComments);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching posts', error: err.message });
    }
  },

  // CREATE a new post - with file upload middleware
  CreatePost: [
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'video', maxCount: 1 }]),
    async (req, res) => {
      try {
        const { author, content } = req.body;
        
        if (!author || !content) {
          return res.status(400).json({ message: 'Author and content are required' });
        }

        const id = uuidv4();
        let imageUrl = null;
        let videoUrl = null;

        // Handle uploaded files
        if (req.files) {
          if (req.files.image) {
            imageUrl = `/uploads/${req.files.image[0].filename}`;
          }
          if (req.files.video) {
            videoUrl = `/uploads/${req.files.video[0].filename}`;
          }
        }

        await query(
          `INSERT INTO Posts (Id, Author, Content, ImageUrl, VideoUrl) VALUES (?, ?, ?, ?, ?)`,
          [id, author, content, imageUrl, videoUrl]
        );

        const [newPost] = await query(`SELECT * FROM Posts WHERE Id = ?`, [id]);
        res.status(201).json(newPost);
      } catch (err) {
        console.error('Create post error:', err);
        res.status(500).json({ message: 'Error creating post', error: err.message });
      }
    }
  ],

  // UPDATE a post by ID
  UpdatePost: async (req, res) => {
    const { content, imageUrl, videoUrl } = req.body;
    const { id } = req.params;

    try {
      const result = await query(
        `UPDATE Posts SET Content = ?, ImageUrl = ?, VideoUrl = ? WHERE Id = ?`,
        [content, imageUrl, videoUrl, id]
      );

      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Post updated successfully' });
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // DELETE a post by ID
  DeletePost: async (req, res) => {
    const { id } = req.params;

    try {
      await query(`DELETE FROM Posts WHERE Id = ?`, [id]);
      res.json({ status: 'ok', message: 'Post deleted successfully' });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  // LIKE a post
  LikePost: async (req, res) => {
    const { postId } = req.params; 
    const { likedBy } = req.body;

    try {
      const [existingLike] = await query(
        `SELECT * FROM Likes WHERE PostID = ? AND LikedBy = ?`,
        [postId, likedBy]
      );

      if (existingLike) {
        return res.status(400).json({ message: 'You already liked this post' });
      }

      await query(
        `INSERT INTO Likes (PostID, LikedBy) VALUES (?, ?)`,
        [postId, likedBy]
      );

      // Update Posts table's like count
      await query(`UPDATE Posts SET Likes = Likes + 1 WHERE Id = ?`, [postId]);

      res.json({ message: 'Post liked successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error liking post', error: err.message });
    }
  },

  // ADD comment to a post
  AddComment: async (req, res) => {
    const { postId } = req.params; // PostID
    const { author, content, } = req.body;

    try {
      if (author !=""&& content!="") {
        await query(
          `INSERT INTO Comments (PostID, Author, Content) VALUES (?, ?, ?)`,
          [postId, author, content]
        );


        res.status(201).json({ message: 'Comment added successfully',status:0 });
      } else {
        res.status(403).json({ message: 'must contain author and the comment' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Error adding comment', error: err.message });
    }
  },
};
