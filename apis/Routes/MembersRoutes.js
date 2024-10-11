const express = require('express');
const Membersroute = express.Router();

const{ GetALLPosts,LikePost,AddComment,CreatePost,UpdatePost, DeletePost} = require('../Controlers/MembersController');

Membersroute.get('/getposts', GetALLPosts);
Membersroute.post('/createPost',CreatePost);
Membersroute.put('/updatePost/:id',UpdatePost);
Membersroute.delete('/deletePost/:id',DeletePost);
Membersroute.put('/likePost/:postId/like',LikePost);
Membersroute.post('/addComment/:postId/comment',AddComment)

module.exports = {Membersroute}