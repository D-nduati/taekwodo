import React, { useState } from 'react';
import { Upload, Button, message } from 'antd';
import axios from 'axios';

const VideoUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    const formData = new FormData();
    formData.append('video', file);

    axios.post('/api/upload-video', formData)
      .then((response) => {
        message.success('Video uploaded successfully!');
        setUploading(false);
      })
      .catch((error) => {
        message.error('Error uploading video:', error);
        setUploading(false);
      });
  };

  return (
    <div>
      <Upload
        beforeUpload={(file) => {
          setFile(file);
          return false;
        }}
        fileList={[]}
      >
        <Button>
          <UploadOutlined /> Select Video
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={uploading || !file}
      >
        {uploading ? 'Uploading...' : 'Upload Video'}
      </Button>
    </div>
  );
};