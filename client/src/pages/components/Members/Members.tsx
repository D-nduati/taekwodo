import React, { useEffect, useState } from 'react';
import {
  Card,
  Input,
  Button,
  Upload,
  List,
  Avatar,
  Comment,
  message,
  Tooltip,
} from 'antd';
import {
  UploadOutlined,
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

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
  CreatedAt: string;
}

const Members: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState<{
    [key: string]: string;
  }>({});
  const [imageFile, setImageFile] = useState<any | null>(null);
  const [videoFile, setVideoFile] = useState<any | null>(null);
  const user = localStorage.getItem('userId');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5000/members/getposts',
        );
        const normalizedPosts = response.data.map((post: any) => ({
          id: post.Id,
          author: post.Author,
          content: post.Content,
          imageUrl: post.ImageUrl,
          videoUrl: post.VideoUrl,
          likes: post.Likes,
          comments: post.comments || [],
          CreatedAt: post.CreatedAt,
          timestamp: post.CreatedAt,
        }));
        setPosts(normalizedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleLikePost = async (postId: string) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post,
    );
    setPosts(updatedPosts);

    try {
      if (user === undefined || user === '' || user === null) return;
      console.log(user)
      const res = await axios.put(
        `http://localhost:5000/members/likePost//like/${postId}`,
        { likedBy: user },
      );
      if (res.status !== 200) {
        message.info('Could Not Like the Post');
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleAddComment = async (postId: string) => {
    if (newCommentContent[postId]) {
      try {
        await axios.post(
          `http://localhost:5000/members//addComment/${postId}/comment`,
          {
            author: 'You',
            content: newCommentContent[postId],
          },
        );

        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  comments: [
                    ...post.comments,
                    { author: 'You', content: newCommentContent[postId] },
                  ],
                }
              : post,
          ),
        );
        setNewCommentContent({ ...newCommentContent, [postId]: '' });
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleCreatePost = async () => {
    if (newPostContent || imageFile || videoFile) {
      const formData = new FormData();
      formData.append('author', 'john');
      formData.append('content', newPostContent);
      if (imageFile) formData.append('image', imageFile);
      if (videoFile) formData.append('video', videoFile);

      try {
        const response = await axios.post(
          'http://localhost:5000/members/createPost',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        const newPost = {
          ...response.data,
          timestamp: new Date().toISOString(),
        };

        setPosts([newPost, ...posts]);
        setNewPostContent('');
        setImageFile(null);
        setVideoFile(null);
      } catch (error) {
        console.error('Error creating post:', error);
      }
    }
  };

  const uploadProps = {
    beforeUpload: (file: any) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      if (isImage) setImageFile(file);
      if (isVideo) setVideoFile(file);
      return false;
    },
  };

  return (
    <div style={{ padding: '20px', background: '#f4f7fb', minHeight: '100vh' }}>
      <Card
        title="Create a Post"
        bordered={false}
        style={{
          width: '65%',
          margin: 'auto',
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
              margin: 'auto',
              marginBottom: '20px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              backgroundColor: '#fff',
            }}
          >
            <Card.Meta
              avatar={
                <Avatar style={{ backgroundColor: '#87d068' }}>
                  {post?.author[0]}
                </Avatar>
              }
              title={<span style={{ fontWeight: 600 }}>{post.author}</span>}
              description={
                <span style={{ color: '#888' }}>
                  {moment(post.timestamp).fromNow()}
                </span>
              }
            />
            <div style={{ marginTop: '10px' }}>{post?.content}</div>
            {post.imageUrl && (
              <img
                src={post?.imageUrl}
                alt="post"
                style={{
                  width: '100%',
                  marginTop: '10px',
                  borderRadius: '6px',
                }}
              />
            )}
            {post.videoUrl && (
              <video
                src={post?.videoUrl}
                controls
                style={{
                  width: '100%',
                  marginTop: '10px',
                  borderRadius: '6px',
                }}
              />
            )}
            <div style={{ marginTop: '10px' }}>
              <Tooltip title="Like">
                <Button
                  icon={
                    post.likes > 0 ? (
                      <LikeFilled style={{ color: '#1890ff' }} />
                    ) : (
                      <LikeOutlined />
                    )
                  }
                  onClick={() => handleLikePost(post?.id)}
                  style={{ borderRadius: '6px', marginRight: '8px' }}
                >
                  {post?.likes}
                </Button>
              </Tooltip>
              <Button
                icon={<MessageOutlined />}
                style={{ borderRadius: '6px' }}
              >
                {post?.comments.length} Comments
              </Button>
            </div>
            <List
              dataSource={post?.comments}
              renderItem={(comment) => (
                <Comment
                  author={
                    <span style={{ fontWeight: 600 }}>{comment?.author}</span>
                  }
                  content={<span>{comment?.content}</span>}
                  style={{ marginTop: '10px' }}
                />
              )}
              style={{ marginTop: '10px' }}
            />
            <TextArea
              rows={1}
              placeholder="Add a comment..."
              value={newCommentContent[post.id] || ''}
              onChange={(e) =>
                setNewCommentContent({
                  ...newCommentContent,
                  [post.id]: e.target.value,
                })
              }
              style={{ marginTop: '10px', borderRadius: '6px' }}
            />
            <Button
              type="primary"
              onClick={() => handleAddComment(post.id)}
              style={{
                marginTop: '5px',
                borderRadius: '6px',
                backgroundColor: '#52c41a',
                borderColor: '#52c41a',
              }}
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
