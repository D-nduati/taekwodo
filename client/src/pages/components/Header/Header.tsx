import React from 'react';
import { Layout, Menu, Button, Avatar, Row, Col, Badge } from 'antd';
import { Link } from 'umi';
import { LogoutOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { Header } = Layout;

const handleLogout = () => {
  history.push('/');
};

const AppHeader: React.FC = () => {
  return (
    <Header style={{ padding: '0', backgroundColor: '#6482AD' }}>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={{ width: '100%' ,backgroundColor: '#6482AD'}}
      >
        <Menu.Item key="1">
          <Link to="/dashboard/profile">Profile</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/dashboard/training">Training</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/dashboard/rankings">Rankings</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/dashboard/quiz">Quizes</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/dashboard/educate">Learn</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/dashboard/enroll">Enroll With Us</Link>
        </Menu.Item>
        <Menu.Item key="6" style={{ marginLeft: 'auto' }}>
          <Badge count={5}>
            <Avatar shape="square" size="small" />
          </Badge>
        </Menu.Item>
        <Menu.Item  key="7">

          <Button
            type="link"
            onClick={handleLogout}
            icon={<LogoutOutlined />}
            style={{ marginLeft: 'auto' }}
          >
            Logout
          </Button>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default AppHeader;
