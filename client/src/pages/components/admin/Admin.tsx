import React, { useState } from 'react';
import { Layout, Tabs,List, Table, Button, Form, Input, Modal, Upload, message, Card, Statistic, Row, Col } from 'antd';
import { UserOutlined, VideoCameraOutlined, CalendarOutlined, BarChartOutlined, UploadOutlined } from '@ant-design/icons';
// import './AdminPanel.css';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';

const { Content, Header } = Layout;
const { TabPane } = Tabs;


const initialUsers = [
  { key: '1', name: 'John Doe', role: 'Instructor', email: 'john@example.com' },
  { key: '2', name: 'Jane Smith', role: 'Student', email: 'jane@example.com' },
];

const initialEvents = [
  { key: '1', event: 'Belt Test', date: '2024-09-10', status: 'Scheduled' },
  { key: '2', event: 'Sparring Tournament', date: '2024-10-15', status: 'Completed' },
];

const Admin:React.FC = () => {
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);  // Explicitly type as string[]
  const [users, setUsers] = useState(initialUsers);
  const [events, setEvents] = useState(initialEvents);
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [isEventModalVisible, setIsEventModalVisible] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  // User Management Handlers
  const handleDeleteUser = (key: string) => {
    setUsers(users.filter(user => user.key !== key));
    message.success('User deleted successfully');
  };

  const handleAddUser = (values: any) => {
    const newUser = {
      key: Math.random().toString(36).substr(2, 9),
      name: values.name,
      role: values.role,
      email: values.email,
    };
    setUsers([...users, newUser]);
    setIsUserModalVisible(false);
    message.success('User added successfully');
  };

  // Event Management Handlers
  const handleAddEvent = (values: any) => {
    const newEvent = {
      key: Math.random().toString(36).substr(2, 9),
      event: values.event,
      date: values.date,
      status: 'Scheduled',
    };
    setEvents([...events, newEvent]);
    setIsEventModalVisible(false);
    message.success('Event added successfully');
  };

  // Video Upload Handlers
  const handleVideoUpload = (info: UploadChangeParam) => {
    if (info.file.status === 'done') {
      const fileName = (info.file.originFileObj as RcFile).name;  // Ensure that the file name is typed correctly
      setUploadedVideos([...uploadedVideos, fileName]);
      message.success('Video uploaded successfully');
    } else if (info.file.status === 'error') {
      message.error('Video upload failed');
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="admin-header">
        <h1 style={{ color: '#fff' }}>Admin Panel</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Tabs defaultActiveKey="1" type="card">
          {/* User Management Tab */}
          <TabPane
            tab={
              <span>
                <UserOutlined />
                User Management
              </span>
            }
            key="1"
          >
            <Table
              dataSource={users}
              columns={[
                { title: 'Name', dataIndex: 'name', key: 'name' },
                { title: 'Role', dataIndex: 'role', key: 'role' },
                { title: 'Email', dataIndex: 'email', key: 'email' },
                {
                  title: 'Action',
                  key: 'action',
                  render: (_, record) => (
                    <Button type="link" danger onClick={() => handleDeleteUser(record.key)}>
                      Delete
                    </Button>
                  ),
                },
              ]}
              title={() => (
                <Button type="primary" onClick={() => setIsUserModalVisible(true)}>
                  Add User
                </Button>
              )}
            />

            <Modal
              title="Add New User"
              visible={isUserModalVisible}
              onCancel={() => setIsUserModalVisible(false)}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleAddUser}>
                <Form.Item name="name" label="Name" rules={[{ required: true, message: 'Please enter a name' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter a valid email' }]}>
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add User
                </Button>
              </Form>
            </Modal>
          </TabPane>

          {/* Content Management Tab */}
          <TabPane
            tab={
              <span>
                <VideoCameraOutlined />
                Content Management
              </span>
            }
            key="2"
          >
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
          </TabPane>

          {/* Event Management Tab */}
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Event Management
              </span>
            }
            key="3"
          >
            <Table
              dataSource={events}
              columns={[
                { title: 'Event', dataIndex: 'event', key: 'event' },
                { title: 'Date', dataIndex: 'date', key: 'date' },
                { title: 'Status', dataIndex: 'status', key: 'status' },
              ]}
              title={() => (
                <Button type="primary" onClick={() => setIsEventModalVisible(true)}>
                  Add Event
                </Button>
              )}
            />

            <Modal
              title="Add New Event"
              visible={isEventModalVisible}
              onCancel={() => setIsEventModalVisible(false)}
              footer={null}
            >
              <Form layout="vertical" onFinish={handleAddEvent}>
                <Form.Item name="event" label="Event" rules={[{ required: true, message: 'Please enter an event' }]}>
                  <Input />
                </Form.Item>
                <Form.Item name="date" label="Date" rules={[{ required: true, message: 'Please select a date' }]}>
                  <Input />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Add Event
                </Button>
              </Form>
            </Modal>
          </TabPane>

          {/* Analytics Dashboard Tab */}
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Analytics Dashboard
              </span>
            }
            key="4"
          >
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Users" value={users.length} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Events" value={events.length} />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic title="Total Videos" value={uploadedVideos.length} />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Admin;
