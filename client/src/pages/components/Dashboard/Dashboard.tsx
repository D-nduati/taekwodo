import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { history } from 'umi';
import { Layout, Menu, Avatar, Typography, Badge, Button, Row, Col, Card } from 'antd';
import { UserOutlined, BellOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [welcomeMessage, setWelcomeMessage] = useState('');
 

  useEffect(() => {
    setWelcomeMessage(`Welcome`);
    // , ${user.username}
  }, [user]);

  const handleLogout = () => {
    history.push('/');
  };

  return (
    <Layout className="dashboard-layout">
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/training">Training</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/rankings">Rankings</Link>
          </Menu.Item>
          <Menu.Item key="4" style={{ marginLeft: 'auto' }}>
            <Button type="link" onClick={handleLogout} icon={<LogoutOutlined />}>
              Logout
            </Button>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: '50px 50px' }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card bordered={false}>
              <Text>{welcomeMessage}</Text>
              <Avatar size={64} icon={<UserOutlined />} />
            </Card>
          </Col>
          <Col span={18}>
            <Card title="Dashboard Overview" bordered={false}>
              <Row gutter={[16, 16]}>
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
            </Card>
          </Col>
        </Row>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        Taekwondo App ©2024 Created by Samuel Ngigi
      </Footer>
    </Layout>
  );
};

export default Dashboard;
