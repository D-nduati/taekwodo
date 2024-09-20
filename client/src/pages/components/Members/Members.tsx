import React, { useState } from 'react';
import { Card, Input, Button, Upload, List, Avatar, Comment, Tooltip } from 'antd';
import { UploadOutlined, LikeOutlined, LikeFilled, MessageOutlined } from '@ant-design/icons';
import moment from 'moment';

const { TextArea } = Input;

interface Post {
  id: string;
  author: string;
  content: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  likes: number;
  comments: { author: string; content: string }[];
  timestamp: string;
}

const Members: React.FC = () => {
  // Mock posts data
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      author: 'John Doe',
      content: 'This is my first post! Excited to be part of this amazing community 🎉.',
      likes: 5,
      comments: [{ author: 'Jane', content: 'Nice post! Keep it up 💪' }],
      timestamp: moment().subtract(10, 'minutes').toISOString(),
    },
    {
      id: '2',
      author: 'Jane Smith',
      content: 'Learning Taekwondo is so much fun! Feeling stronger every day 💥',
      likes: 3,
      comments: [{ author: 'John', content: 'Keep it up, you’re doing great! 👏' }],
      timestamp: moment().subtract(30, 'minutes').toISOString(),
    },
  ]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState<{ [key: string]: string }>({});
  const [imageFile, setImageFile] = useState<any | null>(null);
  const [videoFile, setVideoFile] = useState<any | null>(null);

  // Handle like post
  const handleLikePost = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // Handle add comment
  const handleAddComment = (postId: string) => {
    if (newCommentContent[postId]) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, comments: [...post.comments, { author: 'You', content: newCommentContent[postId] }] }
            : post
        )
      );
      setNewCommentContent({ ...newCommentContent, [postId]: '' });
    }
  };

  // Handle create post
  const handleCreatePost = () => {
    if (newPostContent || imageFile || videoFile) {
      const newPost = {
        id: Math.random().toString(36).substr(2, 9),
        author: 'You',
        content: newPostContent,
        imageUrl: imageFile ? URL.createObjectURL(imageFile) : undefined,
        videoUrl: videoFile ? URL.createObjectURL(videoFile) : undefined,
        likes: 0,
        comments: [],
        timestamp: new Date().toISOString(),
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setImageFile(null);
      setVideoFile(null);
    }
  };

  const uploadProps = {
    beforeUpload: (file: any) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      if (isImage) setImageFile(file);
      if (isVideo) setVideoFile(file);
      return false; // Prevent upload
    },
  };

  return (
    <div style={{ padding: '20px', background: '#f4f7fb', minHeight: '100vh' }}>
      {/* Post creation card */}
      <Card
        title="Create a Post"
        bordered={false}
        style={{
          width: '65%',
          margin:'auto',
          marginBottom: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        <TextArea
          rows={4}
          placeholder="Share something with your community..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          style={{
            borderRadius: '6px',
            marginBottom: '10px',
          }}
        />
        <div>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} style={{ borderRadius: '6px' }}>
              Attach Image/Video
            </Button>
          </Upload>
          <Button
            type="primary"
            onClick={handleCreatePost}
            style={{
              float: 'right',
              marginTop: '10px',
              borderRadius: '6px',
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
            }}
          >
            Post
          </Button>
        </div>
      </Card>

      
      <List
        dataSource={posts}
        renderItem={(post) => (
          <Card
            key={post.id}
            bordered={false}
            style={{
              width: '65%',
              margin:'auto',
              marginBottom: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <Card.Meta
              avatar={<Avatar style={{ backgroundColor: '#87d068' }}>{post.author[0]}</Avatar>}
              title={<span style={{ fontWeight: 600 }}>{post.author}</span>}
              description={<span style={{ color: '#888' }}>{moment(post.timestamp).fromNow()}</span>}
            />
            <div style={{ marginTop: '10px' }}>{post.content}</div>
            {post.imageUrl && <img src={post.imageUrl} alt="post" style={{ width: '100%', marginTop: '10px', borderRadius: '6px' }} />}
            {post.videoUrl && <video src={post.videoUrl} controls style={{ width: '100%', marginTop: '10px', borderRadius: '6px' }} />}
            <div style={{ marginTop: '10px' }}>
              <Tooltip title="Like">
                <Button
                  icon={post.likes > 0 ? <LikeFilled style={{ color: '#1890ff' }} /> : <LikeOutlined />}
                  onClick={() => handleLikePost(post.id)}
                  style={{ borderRadius: '6px', marginRight: '8px' }}
                >
                  {post.likes}
                </Button>
              </Tooltip>
              <Button
                icon={<MessageOutlined />}
                style={{ borderRadius: '6px' }}
              >
                {post.comments.length} Comments
              </Button>
            </div>
            <List
              dataSource={post.comments}
              renderItem={(comment) => (
                <Comment
                  author={<span style={{ fontWeight: 600 }}>{comment.author}</span>}
                  content={<span>{comment.content}</span>}
                  style={{ marginTop: '10px' }}
                />
              )}
              style={{ marginTop: '10px' }}
            />
            <TextArea
              rows={1}
              placeholder="Add a comment..."
              value={newCommentContent[post.id] || ''}
              onChange={(e) => setNewCommentContent({ ...newCommentContent, [post.id]: e.target.value })}
              style={{ marginTop: '10px', borderRadius: '6px' }}
            />
            <Button
              type="primary"
              onClick={() => handleAddComment(post.id)}
              style={{ marginTop: '5px', borderRadius: '6px', backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            >
              Comment
            </Button>
          </Card>
        )}
      />
    </div>
  );
};

export default Members;



