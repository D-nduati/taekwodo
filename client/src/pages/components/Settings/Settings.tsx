import React, { useState } from 'react';
import { Form, Input, Button, Switch, Upload, Avatar, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === 'done') {
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
      message.success('Avatar uploaded successfully');
    }
  };

  const handleFormSubmit = (values: any) => {
    console.log('Form values:', values);
    message.success('Settings updated');
  };

  return (
    <Row justify="center">
      <Col span={12}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            username: 'JohnDoe',
            email: 'john.doe@example.com',
            receiveEmails: true,
            receiveNotifications: true,
          }}
        >
          <Form.Item label="Avatar">
            <Upload
              name="avatar"
              listType="picture"
              showUploadList={false}
              onChange={handleAvatarUpload}
            >
              <Button icon={<UploadOutlined />}>Upload Avatar</Button>
            </Upload>
            <Avatar size={64} src={avatarUrl} style={{ marginTop: '10px' }} />
          </Form.Item>

          <Form.Item name="username" label="Username">
            <Input />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>

          <Form.Item name="password" label="Password">
            <Input.Password placeholder="Change password" />
          </Form.Item>

          <Form.Item name="receiveEmails" label="Receive Emails" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item name="receiveNotifications" label="Receive Notifications" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Save Settings
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default Settings;
