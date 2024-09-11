import React, { useState, useEffect } from 'react';
import { List, Card, Input, Button } from 'antd';
import axios from 'axios';

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const DiscussionBoard = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      console.log(response)
      // setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleNewPost = () => {
    if (newPost.trim() !== '') {
      axios.post('/api/posts', { title: 'New Post', content: newPost })
        .then((response) => {
          setPosts([...posts, response.data]);
          setNewPost('');
        })
        .catch((error) => {
          console.error('Error creating new post:', error);
        });
    }
  };

  return (
    <div>
      <h2>Discussion Board</h2>
      <List
        dataSource={posts}
        renderItem={(post) => (
          <List.Item>
            <Card title={post.title} bordered={false}>
              <p>{post.content}</p>
              <p>Created at: {post.createdAt}</p>
            </Card>
          </List.Item>
        )}
      />
      <Input
        value={newPost}
        onChange={(event) => setNewPost(event.target.value)}
        placeholder="New Post"
      />
      <Button type="primary" onClick={handleNewPost}>
        Create Post
      </Button>
    </div>
  );
};

export default DiscussionBoard;