import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, Avatar, Row, Col, message, Modal, Select, Typography } from 'antd';
import { EditOutlined,UploadOutlined} from '@ant-design/icons';
import './Settings.css';

const { Option } = Select;
const {Paragraph} = Typography;

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>('/default-avatar.png'); // Pre-set a default avatar
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Handle avatar upload via modal
  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
      message.success('Avatar updated successfully');
    }
  };

  // Modal logic for avatar change
  const showAvatarModal = () => setIsModalVisible(true);
  const handleAvatarChange = () => {
    message.success('Avatar changed successfully!');
    setIsModalVisible(false);
  };
  const handleCancelModal = () => setIsModalVisible(false);

  // Handle form submit
  const handleFormSubmit = (values: any) => {
    console.log('Form values:', values);
    message.success('Settings updated');
  };

  return (
    <div className="settings-page">
      <Row justify="center">
        <Col xs={24} sm={18} md={12}>
          <div className="settings-header">
            <Paragraph>Manage your profile, security, and preferences.</Paragraph>
          </div>

          {/* Profile Picture Section */}
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

          {/* Settings Form */}
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
            {/* Username & Email */}
            <Form.Item name="username" label="Username">
              <Input />
            </Form.Item>

            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>

            <Form.Item name="password" label="Change Password">
              <Input.Password placeholder="Enter new password" />
            </Form.Item>

            {/* Theme & Preferences */}
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

            {/* Security & 2FA */}
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
