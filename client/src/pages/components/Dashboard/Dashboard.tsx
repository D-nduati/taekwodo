import React from 'react';
import { useState, useEffect } from 'react';
import { Link, redirect } from 'react-router-dom';
import { Button, Card, Col, Row, Typography, Avatar, Badge, Tabs } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined } from '@ant-design/icons';

interface DashboardProps {
  user: any; // assumes you have a user object with userId, email, and other properties
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [welcomeMessage, setWelcomeMessage] = useState('');
 

  useEffect(() => {
    setWelcomeMessage(`Welcome, ${user.username}!`);
  }, [user]);

  const handleLogout = () => {
    // implement logout logic here
    redirect('/login');
  };

  return (
    <div className="dashboard-container">
      <Row gutter={16}>
        <Col span={6}>
          <Card title="Welcome" bordered={false}>
            <Typography.Text>{welcomeMessage}</Typography.Text>
            <Avatar size={64} icon={<UserOutlined />} />
          </Card>
        </Col>
        <Col span={18}>
          <Card title="Navigation" bordered={false}>
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="Profile" key="1">
                <Link to="/profile">Profile</Link>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Training" key="2">
                <Link to="/training">Training</Link>
              </Tabs.TabPane>
              <Tabs.TabPane tab="Rankings" key="3">
                <Link to="/rankings">Rankings</Link>
              </Tabs.TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="Upcoming Events" bordered={false}>
            <ul>
              <li>
                <Badge status="success" text="Event 1" />
              </li>
              <li>
                <Badge status="warning" text="Event 2" />
              </li>
              <li>
                <Badge status="error" text="Event 3" />
              </li>
            </ul>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Recent Activity" bordered={false}>
            <ul>
              <li>
                <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
                Activity 1
              </li>
              <li>
                <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
                Activity 2
              </li>
              <li>
                <BellOutlined style={{ fontSize: 18, marginRight: 8 }} />
                Activity 3
              </li>
            </ul>
          </Card>
        </Col>
      </Row>
      <Button type="primary" onClick={handleLogout}>
        Logout
      </Button>
      <SettingOutlined style={{ fontSize: 24, marginRight: 16 }} />
    </div>
  );
};

export default Dashboard;