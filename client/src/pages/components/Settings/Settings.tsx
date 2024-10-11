import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, Avatar, Row, Col, message, Modal, Select, Typography } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import axios from 'axios';  
import './Settings.css';

const { Option } = Select;
const { Paragraph } = Typography;

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>('/default-avatar.png'); 
  const [isModalVisible, setIsModalVisible] = useState(false);

  
  const handleAvatarUpload = async (info: any) => {
    if (info.file.status === 'done') {
      try {
        const formData = new FormData();
        formData.append('avatar', info.file.originFileObj);
        const response = await axios.post('/api/user/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        setAvatarUrl(response.data.avatarUrl);  
        message.success('Avatar updated successfully');
      } catch (error) {
        message.error('Error uploading avatar');
      }
    }
  };

 
  const showAvatarModal = () => setIsModalVisible(true);
  const handleAvatarChange = () => {
    message.success('Avatar changed successfully!');
    setIsModalVisible(false);
  };
  const handleCancelModal = () => setIsModalVisible(false);

  
  const handleFormSubmit = async (values: any) => {
    try {
      await axios.put('/api/user/settings', values);
      message.success('Settings updated');
    } catch (error) {
      message.error('Error updating settings');
    }
  };

  return (
    <div className="settings-page">
      <Row justify="center">
        <Col xs={24} sm={18} md={12}>
          <div className="settings-header">
            <Paragraph>Manage your profile, security, and preferences.</Paragraph>
          </div>

          
          <div className="profile-section">
            <div className="avatar-wrapper" onClick={showAvatarModal}>
              <Avatar size={120} src={avatarUrl} className="avatar-img" />
              <div className="edit-icon">
                <EditOutlined style={{ fontSize: '24px', color: '#fff' }} />
              </div>
            </div>
            <p className="click-to-edit">Click to change profile picture</p>
          </div>

          <Modal
            title="Change Profile Picture"
            open={isModalVisible}
            onOk={handleAvatarChange}
            onCancel={handleCancelModal}
            okText="Confirm"
            cancelText="Cancel"
          >
            <Upload
              name="avatar"
              listType="picture"
              showUploadList={false}
              onChange={handleAvatarUpload}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Choose New Picture</Button>
            </Upload>
          </Modal>

         
          <Form
            form={form}
            layout="vertical"
            onFinish={handleFormSubmit}
            initialValues={{
              username: 'Sam',
              email: 'sam@gmail.com',
              receiveEmails: true,
              receiveNotifications: true,
              theme: 'light',
              twoFactorAuth: true,
            }}
            className="settings-form"
          >
          
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Change Password">
              <Input.Password placeholder="Enter new password" />
            </Form.Item>

          
            <Form.Item name="theme" label="App Theme">
              <Select>
                <Option value="light">Light Mode</Option>
                <Option value="dark">Dark Mode</Option>
              </Select>
            </Form.Item>

            <Form.Item name="receiveEmails" label="Receive Email Updates" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item name="receiveNotifications" label="Enable Push Notifications" valuePropName="checked">
              <Switch />
            </Form.Item>
            <Form.Item name="twoFactorAuth" label="Two-Factor Authentication" valuePropName="checked">
              <Switch checkedChildren="Enabled" unCheckedChildren="Disabled" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="save-btn">
                Save Settings
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Settings;
