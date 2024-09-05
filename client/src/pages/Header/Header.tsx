import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'umi';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  return (
    <Layout>
      <Header style={{ backgroundColor: '#001529' }}>
        <div className="logo" style={{ color: '#fff', fontSize: '24px', float: 'left', marginRight: '20px' }}>
          MyApp
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['/']}
          style={{ lineHeight: '64px', backgroundColor: '#001529', color: '#fff' }}
        >
          <Menu.Item key="/">
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="/educate">
            <Link to="/educate">Educate</Link>
          </Menu.Item>
          <Menu.Item key="/profile">
            <Link to="/profile">Profile</Link>
          </Menu.Item>
          <Menu.Item key="/pricing">
            <Link to="/pricing">Pricing</Link>
          </Menu.Item>
          <Menu.Item key="/discussion">
            <Link to="/discussion">Discussion</Link>
          </Menu.Item>
          <Menu.Item key="/videofilter">
            <Link to="/videofilter">Video Filter</Link>
          </Menu.Item>
          <Menu.Item key="/videorating">
            <Link to="/videorating">Video Rating</Link>
          </Menu.Item>
          <Menu.Item key="/videoupload">
            <Link to="/videoupload">Video Upload</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default AppHeader;
