// VideoManagement.tsx
import React, { useState } from 'react';
import { Upload, Button, List, Card, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';

const VideoManagement: React.FC = () => {
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  const handleVideoUpload = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const fileName = (info.file.originFileObj as RcFile).name;
      setUploadedVideos([...uploadedVideos, fileName]);
      message.success('Video uploaded successfully');
    } else if (info.file.status === 'error') {
      message.error('Video upload failed');
    }
  };

  return (
    <Card title="Upload Educational Videos">
      <Upload
        name="video"
        action="/upload"
        onChange={handleVideoUpload}
        showUploadList={false}
      >
        <Button icon={<UploadOutlined />} loading={isVideoUploading}>
          Upload Video
        </Button>
      </Upload>
      <List
        header={<div>Uploaded Videos</div>}
        bordered
        dataSource={uploadedVideos}
        renderItem={(video) => <List.Item>{video}</List.Item>}
        style={{ marginTop: '20px' }}
      />
    </Card>
  );
};

export default VideoManagement;
