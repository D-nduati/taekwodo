// Admin.tsx
import React from 'react';
import { Layout, Tabs } from 'antd';
import { UserOutlined, VideoCameraOutlined, CalendarOutlined, BarChartOutlined } from '@ant-design/icons';
import UserManagement from './UserManagement';
import EventManagement from './EventManagement';
import VideoManagement from './VideoManagement';
import QuizManager from './QuizManager';
import AnalyticsDashboard from './AnalyticsBoard';

const { Content, Header } = Layout;
const { TabPane } = Tabs;

const Admin: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="admin-header">
        <h1 style={{ color: '#fff' }}>Admin Panel</h1>
      </Header>
      <Content style={{ padding: '50px' }}>
        <Tabs defaultActiveKey="1" type="card">
          <TabPane
            tab={
              <span>
                <UserOutlined />
                User Management
              </span>
            }
            key="1"
          >
            <UserManagement />
          </TabPane>
          <TabPane
            tab={
              <span>
                <VideoCameraOutlined />
                Content Management
              </span>
            }
            key="2"
          >
            <VideoManagement />
          </TabPane>
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                Event Management
              </span>
            }
            key="3"
          >
            <EventManagement />
          </TabPane>
          <TabPane
            tab={
              <span>
                <CalendarOutlined />
                QuiZ Management
              </span>
            }
            key="6"
          >
            <QuizManager />
          </TabPane>
          <TabPane
            tab={
              <span>
                <BarChartOutlined />
                Analytics Dashboard
              </span>
            }
            key="4"
          >
            {/* <AnalyticsDashboard
              totalUsers={initialUsers.length}
              totalEvents={initialEvents.length}
              totalVideos={0} // Adjust according to actual data
            /> */}
          </TabPane>
        </Tabs>
      </Content>
    </Layout>
  );
};

export default Admin;
