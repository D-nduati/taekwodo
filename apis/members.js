const io = require('socket.io')(5000, {
    cors: {
      origin: "*",
    }
  });
  
  let posts = [];
  
  io.on('connection', (socket) => {
    socket.emit('updatePosts', posts);
  
    socket.on('newPost', (newPost) => {
      const post = { 
        id: Math.random().toString(36).substr(2, 9), 
        author: 'User', 
        content: newPost.content, 
        imageUrl: newPost.imageUrl, 
        videoUrl: newPost.videoUrl, 
        likes: 0, 
        comments: [], 
        timestamp: new Date().toISOString() 
      };
      posts.push(post);
      io.emit('updatePosts', posts);
    });
  
    socket.on('likePost', (postId) => {
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.likes += 1;
        io.emit('updatePosts', posts);
      }
    });
  
    socket.on('commentPost', ({ postId, content }) => {
      const post = posts.find(p => p.id === postId);
      if (post) {
        post.comments.push({ author: 'User', content });
        io.emit('updatePosts', posts);
      }
    });
  });
  