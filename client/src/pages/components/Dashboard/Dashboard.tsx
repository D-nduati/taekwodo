import React, { useState, useEffect } from 'react';
import { Layout, Menu, Image } from 'antd';
import { HomeOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import AppHeader from '../Header/Header';

const { Content, Footer, Sider } = Layout;

interface DashboardProps {
  user: any;
}

const Dashboard: React.FC<DashboardProps> = ({ user, children }) => {
  const [welcomeMessage, setWelcomeMessage] = useState('');

  useEffect(() => {
    setWelcomeMessage(`Welcome`);
  }, [user]);

  return (
    <Layout style={{ backgroundColor: '#BACD92' }}>
      <Sider style={{ backgroundColor: '#BACD92', marginTop: '50px' }}>
        <Menu
          style={{ backgroundColor: '#BACD92' }}
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/dashboard/home">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<TeamOutlined />}>
            <Link to="/dashboard/members">Members</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<SettingOutlined />}>
            <Link to="/dashboard/settings">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <AppHeader />

        <Content style={{ padding: '20px' }}>{children}</Content>

        <Footer style={{ textAlign: 'center' }}>
          Taekwondo App ©2024 Created by Samuel Ngigi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
