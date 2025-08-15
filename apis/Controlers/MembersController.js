const { query } = require('./db');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  // GET all posts with their comments and like count
  GetAllPosts: async (req, res) => {
    try {
      // Get all posts (with like count from Posts table)
      const posts = await query(`
        SELECT Id, Author, Content, ImageUrl, VideoUrl, Likes, CreatedAt
        FROM Posts
      `);
      //Get all likes
      // I will create a trigger such that
      //  when the table Likes is gets updated it automatically updates the table for posts
      // const likes = await query(`Select LikedBy, PostID From Likes`)

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

  // CREATE a new post
  CreatePost: async (req, res) => {
    const { author, content, imageUrl, videoUrl } = req.body;
    const id = uuidv4(); // UUIDv4 for CHAR(36)

    try {
      await query(
        `INSERT INTO Posts (Id, Author, Content, ImageUrl, VideoUrl) VALUES (?, ?, ?, ?, ?)`,
        [id, author, content, imageUrl, videoUrl]
      );

      const [newPost] = await query(`SELECT * FROM Posts WHERE Id = ?`, [id]);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

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
    const { Id } = req.params; // PostID
    const { likedBy } = req.body;

    try {
      // Prevent duplicate likes by the same user
      const [existingLike] = await query(
        `SELECT * FROM Likes WHERE PostID = ? AND LikedBy = ?`,
        [Id, likedBy]
      );

      if (existingLike) {
        return res.status(400).json({ message: 'You already liked this post' });
      }

      // Insert like
      await query(
        `INSERT INTO Likes (PostID, LikedBy) VALUES (?, ?)`,
        [Id, likedBy]
      );

      // Update Posts table's like count
      await query(`UPDATE Posts SET Likes = Likes + 1 WHERE Id = ?`, [Id]);

      res.json({ message: 'Post liked successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error liking post', error: err.message });
    }
  },

  // ADD comment to a post
  AddComment: async (req, res) => {
    const { Id } = req.params; // PostID
    const { author, content } = req.body;

    try {
      if (author !=""&& content!="") {
        await query(
          `INSERT INTO Comments (PostID, Author, Content) VALUES (?, ?, ?)`,
          [Id, author, content]
        );


        res.status(201).json({ message: 'Comment added successfully' });
      } else {
        res.status(403).json({ message: 'must contain author and the comment' })
      }
    } catch (err) {
      res.status(500).json({ message: 'Error adding comment', error: err.message });
    }
  },
};
