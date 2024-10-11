const express = require('express');
const Membersroute = express.Router();

const{ GetALLPosts,CreatePost,UpdatePost, DeletePost} = require('../Controlers/MembersController');

Membersroute.get('/getposts', GetALLPosts);
Membersroute.post('/createPost',CreatePost);
Membersroute.put('/updatePost/:id',UpdatePost);
Membersroute.delete('/deletePost/:id',DeletePost);

module.exports = {Membersroute}