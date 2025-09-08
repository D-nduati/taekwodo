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
  Modal,
  Divider,
} from 'antd';
import {
  UploadOutlined,
  LikeOutlined,
  LikeFilled,
  MessageOutlined,
  DeleteOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';

const { TextArea } = Input;

interface PostComment {
  CommentID: number;
  PostID: string;
  Author: string;
  Content: string;
  CreatedAt: string;
}

interface Post {
  id: string;
  author: string;
  content: string;
  imageUrl?: string | null;
  videoUrl?: string | null;
  likes: number;
  comments: PostComment[];
  timestamp: string;
  CreatedAt: string;
}

const Members: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [newCommentContent, setNewCommentContent] = useState<{
    [key: string]: string;
  }>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [modalComment, setModalComment] = useState('');
  const user = localStorage.getItem('userId');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/members/getposts');
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
      message.error('Failed to load posts');
    }
  };

  const handleLikePost = async (postId: string) => {
    try {
      if (!user) {
        message.warning('Please login to like posts');
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/members/likePost/like/${postId}`,
        { likedBy: user }
      );
      
      if (res.status === 200) {
        setPosts(posts.map(post =>
          post.id === postId ? { ...post, likes: post.likes + 1 } : post
        ));
        
        // Update selected post if it's the one being liked
        if (selectedPost && selectedPost.id === postId) {
          setSelectedPost({ ...selectedPost, likes: selectedPost.likes + 1 });
        }
        
        message.success('Post liked!');
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        message.info('You already liked this post');
      } else {
        message.error('Error liking post');
      }
    }
  };

  const handleAddComment = async (postId: string, commentText: string, isFromModal: boolean = false) => {
    const comment = commentText?.trim();
    if (!comment) return;

    try {
      if (!user) {
        message.warning('Please login to comment');
        return;
      }

      await axios.post(
        `http://localhost:5000/members/addComment/comment/${postId}`,
        {
          author: user,
          content: comment,
        }
      );

      // Update posts list
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
                ...post,
                comments: [
                  ...post.comments,
                  { 
                    CommentID: Date.now(), 
                    PostID: postId, 
                    Author: user || 'Anonymous', 
                    Content: comment,
                    CreatedAt: new Date().toISOString()
                  },
                ],
              }
            : post
        )
      );

      // Update selected post if it's the one being commented on
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost({
          ...selectedPost,
          comments: [
            ...selectedPost.comments,
            { 
              CommentID: Date.now(), 
              PostID: postId, 
              Author: user || 'Anonymous', 
              Content: comment,
              CreatedAt: new Date().toISOString()
            }
          ]
        });
      }

      // Clear comment input
      if (isFromModal) {
        setModalComment('');
      } else {
        setNewCommentContent({ ...newCommentContent, [postId]: '' });
      }
      
      message.success('Comment added!');
    } catch (error) {
      console.error('Error adding comment:', error);
      message.error('Failed to add comment');
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() && !imageFile && !videoFile) {
      message.warning('Please add some content or media');
      return;
    }

    if (!user) {
      message.warning('Please login to create posts');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('author', user);
      formData.append('content', newPostContent);
      if (imageFile) formData.append('image', imageFile);
      if (videoFile) formData.append('video', videoFile);

      const response = await axios.post(
        'http://localhost:5000/members/createPost',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const newPost = {
        id: response.data.Id,
        author: response.data.Author,
        content: response.data.Content,
        imageUrl: response.data.ImageUrl,
        videoUrl: response.data.VideoUrl,
        likes: response.data.Likes || 0,
        comments: [],
        timestamp: response.data.CreatedAt,
        CreatedAt: response.data.CreatedAt,
      };

      setPosts([newPost, ...posts]);
      setNewPostContent('');
      setImageFile(null);
      setVideoFile(null);
      message.success('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      message.error('Failed to create post');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (type: 'image' | 'video') => {
    if (type === 'image') setImageFile(null);
    if (type === 'video') setVideoFile(null);
  };

  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const closePostModal = () => {
    setShowModal(false);
    setSelectedPost(null);
    setModalComment('');
  };

  const uploadProps = {
    beforeUpload: (file: File) => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      
      if (!isImage && !isVideo) {
        message.error('You can only upload image or video files!');
        return Upload.LIST_IGNORE;
      }

      if (isImage) setImageFile(file);
      if (isVideo) setVideoFile(file);
      
      return false; // Prevent automatic upload
    },
    showUploadList: false,
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
        
        <div style={{ marginBottom: '10px' }}>
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />} style={{ borderRadius: '6px' }}>
              Attach Image/Video
            </Button>
          </Upload>
          
          {imageFile && (
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
              <span>Image: {imageFile.name}</span>
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveFile('image')}
              />
            </div>
          )}
          
          {videoFile && (
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
              <span>Video: {videoFile.name}</span>
              <Button
                type="link"
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleRemoveFile('video')}
              />
            </div>
          )}
        </div>

        <Button
          type="primary"
          onClick={handleCreatePost}
          loading={uploading}
          disabled={uploading}
          style={{
            float: 'right',
            borderRadius: '6px',
          }}
        >
          {uploading ? 'Posting...' : 'Post'}
        </Button>
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
                  cursor: 'pointer',
                }}
                onClick={() => openPostModal(post)}
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
                onClick={() => openPostModal(post)}
              >
                {post?.comments.length} Comments
              </Button>
            </div>
            
            {/* Show only 2 comments in the main view */}
            {post.comments.slice(0, 2).map((comment) => (
              <Comment
                key={comment.CommentID}
                author={
                  <span style={{ fontWeight: 600 }}>{comment.Author}</span>
                }
                content={<span>{comment.Content}</span>}
                datetime={
                  <span style={{ color: '#888', fontSize: '12px' }}>
                    {moment(comment.CreatedAt).fromNow()}
                  </span>
                }
                style={{ marginTop: '10px' }}
              />
            ))}
            
            {/* Show "View all comments" if there are more than 2 */}
            {post.comments.length > 2 && (
              <Button
                type="link"
                onClick={() => openPostModal(post)}
                style={{ padding: 0, marginTop: '8px' }}
              >
                View all {post.comments.length} comments
              </Button>
            )}
            
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
              onClick={() => handleAddComment(post.id, newCommentContent[post.id] || '')}
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

      {/* Post Detail Modal */}
      <Modal
        open={showModal}
        onCancel={closePostModal}
        footer={null}
        width={700}
        closeIcon={<CloseOutlined />}
      >
        {selectedPost && (
          <div style={{ padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
              <Avatar size={40} style={{ backgroundColor: '#87d068', marginRight: '12px' }}>
                {selectedPost.author[0]}
              </Avatar>
              <div>
                <div style={{ fontWeight: 600 }}>{selectedPost.author}</div>
                <div style={{ color: '#888', fontSize: '13px' }}>
                  {moment(selectedPost.timestamp).fromNow()}
                </div>
              </div>
            </div>
            
            <div style={{ marginBottom: '16px' }}>{selectedPost.content}</div>
            
            {selectedPost.imageUrl && (
              <img
                src={selectedPost.imageUrl}
                alt="post"
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              />
            )}
            
            {selectedPost.videoUrl && (
              <video
                src={selectedPost.videoUrl}
                controls
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  marginBottom: '16px',
                }}
              />
            )}
            
            <Divider />
            
            <div style={{ marginBottom: '16px' }}>
              <Tooltip title="Like">
                <Button
                  icon={
                    selectedPost.likes > 0 ? (
                      <LikeFilled style={{ color: '#1890ff' }} />
                    ) : (
                      <LikeOutlined />
                    )
                  }
                  onClick={() => handleLikePost(selectedPost.id)}
                  style={{ borderRadius: '6px', marginRight: '8px' }}
                >
                  {selectedPost.likes} Likes
                </Button>
              </Tooltip>
              <span style={{ color: '#888' }}>
                {selectedPost.comments.length} Comments
              </span>
            </div>
            
            <Divider />
            
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '16px' }}>
              {selectedPost.comments.length > 0 ? (
                selectedPost.comments.map((comment) => (
                  <Comment
                    key={comment.CommentID}
                    author={
                      <span style={{ fontWeight: 600 }}>{comment.Author}</span>
                    }
                    content={<span>{comment.Content}</span>}
                    datetime={
                      <span style={{ color: '#888', fontSize: '12px' }}>
                        {moment(comment.CreatedAt).fromNow()}
                      </span>
                    }
                    style={{ marginBottom: '12px' }}
                  />
                ))
              ) : (
                <div style={{ textAlign: 'center', color: '#888', padding: '20px' }}>
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
            
            <Divider />
            
            <div>
              <TextArea
                rows={2}
                placeholder="Add a comment..."
                value={modalComment}
                onChange={(e) => setModalComment(e.target.value)}
                style={{ borderRadius: '6px', marginBottom: '10px' }}
              />
              <Button
                type="primary"
                onClick={() => handleAddComment(selectedPost.id, modalComment, true)}
                style={{
                  borderRadius: '6px',
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a',
                }}
              >
                Post Comment
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Members;
// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   Input,
//   Button,
//   Upload,
//   List,
//   Avatar,
//   Comment,
//   message,
//   Tooltip,
//   Modal,
// } from 'antd';
// import {
//   UploadOutlined,
//   LikeOutlined,
//   LikeFilled,
//   MessageOutlined,
//   DeleteOutlined,
// } from '@ant-design/icons';
// import moment from 'moment';
// import axios from 'axios';

// const { TextArea } = Input;

// interface Post {
//   id: string;
//   author: string;
//   content: string;
//   imageUrl?: string | null;
//   videoUrl?: string | null;
//   likes: number;
//   comments: { author: string; content: string }[];
//   timestamp: string;
//   CreatedAt: string;
// }

// const Members: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [newPostContent, setNewPostContent] = useState('');
//   const [newCommentContent, setNewCommentContent] = useState<{
//     [key: string]: string;
//   }>({});
//   const [imageFile, setImageFile] = useState<File | null>(null);
//   const [videoFile, setVideoFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const user = localStorage.getItem('userId');
//   const [showModal,setShowModal] = useState(false);

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   const fetchPosts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/members/getposts');
//       const normalizedPosts = response.data.map((post: any) => ({
//         id: post.Id,
//         author: post.Author,
//         content: post.Content,
//         imageUrl: post.ImageUrl,
//         videoUrl: post.VideoUrl,
//         likes: post.Likes,
//         comments: post.comments || [],
//         CreatedAt: post.CreatedAt,
//         timestamp: post.CreatedAt,
//       }));
//       setPosts(normalizedPosts);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//       message.error('Failed to load posts');
//     }
//   };

//   const handleLikePost = async (postId: string) => {
//     try {
//       if (!user) {
//         message.warning('Please login to like posts');
//         return;
//       }

//       const res = await axios.put(
//         `http://localhost:5000/members/likePost/like/${postId}`,
//         { likedBy: user }
//       );
      
//       if (res.status === 200) {
//         setPosts(posts.map(post =>
//           post.id === postId ? { ...post, likes: post.likes + 1 } : post
//         ));
//         message.success('Post liked!');
//       }
//     } catch (error: any) {
//       if (error.response?.status === 400) {
//         message.info('You already liked this post');
//       } else {
//         message.error('Error liking post');
//       }
//     }
//   };

//   const handleAddComment = async (postId: string) => {
//     const comment = newCommentContent[postId]?.trim();
//     if (!comment) return;

//     try {
//       if (!user) {
//         message.warning('Please login to comment');
//         return;
//       }

//       await axios.post(
//         `http://localhost:5000/members/addComment/comment/${postId}`,
//         {
//           author: user,
//           content: comment,
//         }
//       );

//       setPosts(prevPosts =>
//         prevPosts.map(post =>
//           post.id === postId
//             ? {
//                 ...post,
//                 comments: [
//                   ...post.comments,
//                   { author: user || 'Anonymous', content: comment },
//                 ],
//               }
//             : post
//         )
//       );
//       setNewCommentContent({ ...newCommentContent, [postId]: '' });
//       message.success('Comment added!');
//     } catch (error) {
//       console.error('Error adding comment:', error);
//       message.error('Failed to add comment');
//     }
//   };

//   const handleCreatePost = async () => {
//     if (!newPostContent.trim() && !imageFile && !videoFile) {
//       message.warning('Please add some content or media');
//       return;
//     }

//     if (!user) {
//       message.warning('Please login to create posts');
//       return;
//     }

//     setUploading(true);
//     try {
//       const formData = new FormData();
//       formData.append('author', user);
//       formData.append('content', newPostContent);
//       if (imageFile) formData.append('image', imageFile);
//       if (videoFile) formData.append('video', videoFile);

//       const response = await axios.post(
//         'http://localhost:5000/members/createPost',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );

//       const newPost = {
//         id: response.data.Id,
//         author: response.data.Author,
//         content: response.data.Content,
//         imageUrl: response.data.ImageUrl,
//         videoUrl: response.data.VideoUrl,
//         likes: response.data.Likes || 0,
//         comments: [],
//         timestamp: response.data.CreatedAt,
//         CreatedAt: response.data.CreatedAt,
//       };

//       setPosts([newPost, ...posts]);
//       setNewPostContent('');
//       setImageFile(null);
//       setVideoFile(null);
//       message.success('Post created successfully!');
//     } catch (error) {
//       console.error('Error creating post:', error);
//       message.error('Failed to create post');
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleRemoveFile = (type: 'image' | 'video') => {
//     if (type === 'image') setImageFile(null);
//     if (type === 'video') setVideoFile(null);
//   };

//   const uploadProps = {
//     beforeUpload: (file: File) => {
//       const isImage = file.type.startsWith('image/');
//       const isVideo = file.type.startsWith('video/');
      
//       if (!isImage && !isVideo) {
//         message.error('You can only upload image or video files!');
//         return Upload.LIST_IGNORE;
//       }

//       if (isImage) setImageFile(file);
//       if (isVideo) setVideoFile(file);
      
//       return false; // Prevent automatic upload
//     },
//     showUploadList: false,
//   };

//   return (
//     <div style={{ padding: '20px', background: '#f4f7fb', minHeight: '100vh' }}>
//       <Card
//         title="Create a Post"
//         bordered={false}
//         style={{
//           width: '65%',
//           margin: 'auto',
//           marginBottom: '20px',
//           borderRadius: '8px',
//           boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//         }}
//       >
//         <TextArea
//           rows={4}
//           placeholder="Share something with your community..."
//           value={newPostContent}
//           onChange={(e) => setNewPostContent(e.target.value)}
//           style={{
//             borderRadius: '6px',
//             marginBottom: '10px',
//           }}
//         />
        
//         <div style={{ marginBottom: '10px' }}>
//           <Upload {...uploadProps}>
//             <Button icon={<UploadOutlined />} style={{ borderRadius: '6px' }}>
//               Attach Image/Video
//             </Button>
//           </Upload>
          
//           {imageFile && (
//             <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
//               <span>Image: {imageFile.name}</span>
//               <Button
//                 type="link"
//                 danger
//                 icon={<DeleteOutlined />}
//                 onClick={() => handleRemoveFile('image')}
//               />
//             </div>
//           )}
          
//           {videoFile && (
//             <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
//               <span>Video: {videoFile.name}</span>
//               <Button
//                 type="link"
//                 danger
//                 icon={<DeleteOutlined />}
//                 onClick={() => handleRemoveFile('video')}
//               />
//             </div>
//           )}
//         </div>

//         <Button
//           type="primary"
//           onClick={handleCreatePost}
//           loading={uploading}
//           disabled={uploading}
//           style={{
//             float: 'right',
//             borderRadius: '6px',
//           }}
//         >
//           {uploading ? 'Posting...' : 'Post'}
//         </Button>
//       </Card>

//       <List
//         dataSource={posts}
//         renderItem={(post) => (
//           <Card
//             key={post.id}
//             bordered={false}
//             style={{
//               width: '65%',
//               margin: 'auto',
//               marginBottom: '20px',
//               borderRadius: '8px',
//               boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//               backgroundColor: '#fff',
//             }}
//           >
//             <Card.Meta
//               avatar={
//                 <Avatar style={{ backgroundColor: '#87d068' }}>
//                   {post?.author[0]}
//                 </Avatar>
//               }
//               title={<span style={{ fontWeight: 600 }}>{post.author}</span>}
//               description={
//                 <span style={{ color: '#888' }}>
//                   {moment(post.timestamp).fromNow()}
//                 </span>
//               }
//             />
//             <div style={{ marginTop: '10px' }}>{post?.content}</div>
//             {post.imageUrl && (
//               <img
//                 src={post?.imageUrl}
//                 alt="post"
//                 style={{
//                   width: '100%',
//                   marginTop: '10px',
//                   borderRadius: '6px',
//                 }}
//               />
//             )}
//             {post.videoUrl && (
//               <video
//                 src={post?.videoUrl}
//                 controls
//                 style={{
//                   width: '100%',
//                   marginTop: '10px',
//                   borderRadius: '6px',
//                 }}
//               />
//             )}
//             <div style={{ marginTop: '10px' }}>
//               <Tooltip title="Like">
//                 <Button
//                   icon={
//                     post.likes > 0 ? (
//                       <LikeFilled style={{ color: '#1890ff' }} />
//                     ) : (
//                       <LikeOutlined />
//                     )
//                   }
//                   onClick={() => handleLikePost(post?.id)}
//                   style={{ borderRadius: '6px', marginRight: '8px' }}
//                 >
//                   {post?.likes}
//                 </Button>
//               </Tooltip>
//               <Button
//                 icon={<MessageOutlined />}
//                 style={{ borderRadius: '6px' }}
//               >
//                 {post?.comments.length} Comments
//               </Button>
//             </div>
//             <List
//               dataSource={post?.comments}
//               renderItem={(comment) => (
//                 <Comment
//                   author={
//                     <span style={{ fontWeight: 600 }}>{comment?.author}</span>
//                   }
//                   content={<span>{comment?.content}</span>}
//                   style={{ marginTop: '10px' }}
//                 />
//               )}
//               style={{ marginTop: '10px' }}
//             />
//             <TextArea
//               rows={1}
//               placeholder="Add a comment..."
//               value={newCommentContent[post.id] || ''}
//               onChange={(e) =>
//                 setNewCommentContent({
//                   ...newCommentContent,
//                   [post.id]: e.target.value,
//                 })
//               }
//               style={{ marginTop: '10px', borderRadius: '6px' }}
//             />
//             <Button
//               type="primary"
//               onClick={() => handleAddComment(post.id)}
//               style={{
//                 marginTop: '5px',
//                 borderRadius: '6px',
//                 backgroundColor: '#52c41a',
//                 borderColor: '#52c41a',
//               }}
//             >
//               Comment
//             </Button>
//           </Card>
//         )}
//       />
//       <Modal
//       open={showModal}
//       onCancel={()=>setShowModal(false)}
//       >

//       </Modal>
//     </div>
//   );
// };

// export default Members;
