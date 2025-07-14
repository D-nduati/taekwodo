const express = require('express');
const Membersroute = express.Router();

const{ GetAllPosts,LikePost,AddComment,CreatePost,UpdatePost, DeletePost} = require('../Controlers/MembersController');

Membersroute.get('/getposts', GetAllPosts);
Membersroute.post('/createPost',CreatePost);
Membersroute.put('/updatePost/:id',UpdatePost);
Membersroute.delete('/deletePost/:id',DeletePost);
Membersroute.put('/likePost/like/:postId',LikePost);
Membersroute.post('/addComment/comment/:postId',AddComment)

module.exports = {Membersroute}