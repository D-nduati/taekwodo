// VideoManagement.tsx
import React, { useState } from 'react';
import { Upload, Button, List, Card, Input, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import axios from 'axios';

const { Option } = Select;

const VideoManagement: React.FC = () => {
  const [uploadedVideos, setUploadedVideos] = useState<any[]>([]);
  const [videoDetails, setVideoDetails] = useState<{ title: string; description: string; category: string }>({ title: '', description: '', category: '' });

  const handleVideoUpload = async (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const fileName = (info.file.originFileObj as RcFile).name;
      const newVideo = { ...videoDetails, videoUrl: fileName };
      
      await axios.post('http://localhost:5000/admin/saveVideos', newVideo);
      
      setUploadedVideos([...uploadedVideos, newVideo]);
      message.success('Video uploaded successfully');
      setVideoDetails({ title: '', description: '', category: '' }); 
    } else if (info.file.status === 'error') {
      message.error('Video upload failed');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoDetails({ ...videoDetails, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setVideoDetails({ ...videoDetails, category: value });
  };

  return (
    <Card title="Upload Educational Videos">
      <Upload
        name="video"
        action="/upload"
        onChange={handleVideoUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />}>
          Upload Video
        </Button>
      </Upload>
      <Input
        placeholder="Video Title"
        name="title"
        value={videoDetails.title}
        onChange={handleInputChange}
        style={{ marginTop: '20px' }}
      />
      <Input
        placeholder="Video Description"
        name="description"
        value={videoDetails.description}
        onChange={handleInputChange}
        style={{ marginTop: '10px' }}
      />
      <Select
        placeholder="Select Category"
        onChange={handleCategoryChange}
        style={{ marginTop: '10px', width: '100%' }}
      >
        <Option value="beginner">Beginner</Option>
        <Option value="intermediate">Intermediate</Option>
        <Option value="advanced">Advanced</Option>
      </Select>
      <List
        header={<div>Uploaded Videos</div>}
        bordered
        dataSource={uploadedVideos}
        renderItem={(video) => (
          <List.Item>
            <div>
              <strong>{video.title}</strong> - {video.category}
            </div>
          </List.Item>
        )}
        style={{ marginTop: '20px' }}
      />
    </Card>
  );
};

export default VideoManagement;
