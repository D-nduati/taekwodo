import React from 'react';
import { Card, Avatar, List, Layout, Typography, Button, Badge, Tag, Space } from 'antd';
import { UserOutlined, TrophyOutlined, SettingOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const achievements = ['Black Belt - 2nd Dan', 'National Champion 2023', 'Taekwondo Instructor'];
  const skills = ['Sparring', 'Forms', 'Self-Defense', 'Coaching', 'Physical Conditioning'];

  return (
    <Layout style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 0' }}>
      <div className="profile-container" style={{ maxWidth: 800, margin: 'auto', backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        
        {/* Profile Header with Background and Avatar */}
        <div style={{ position: 'relative', padding: '20px', background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <Avatar size={100} icon={<UserOutlined />} style={{ border: '4px solid #fff', position: 'absolute', top: 20, left: 30 }} />
          <div style={{ marginLeft: 150 }}>
            <Title level={2} style={{ color: '#fff' }}>John Doe</Title>
            <Text type="secondary" style={{ color: '#fff' }}>Taekwondo Enthusiast | Instructor</Text>
          </div>
          <Button shape="circle" icon={<EditOutlined />} style={{ position: 'absolute', top: 20, right: 20, color: '#fff', borderColor: '#fff' }} />
        </div>
        
        {/* Profile Details */}
        <div style={{ padding: '20px' }}>
          <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <Button type="primary">Edit Profile</Button>
            <Button icon={<SettingOutlined />}>Settings</Button>
          </Space>

          {/* Skills Section */}
          <div style={{ marginBottom: 20 }}>
            <Text strong>Skills:</Text>
            <div style={{ marginTop: 10 }}>
              {skills.map(skill => (
                <Tag key={skill} color="blue" style={{ marginBottom: 8 }}>{skill}</Tag>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <Card title="Achievements" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={achievements}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<TrophyOutlined style={{ fontSize: 24, color: '#fadb14' }} />}
                    title={item}
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Additional Actions */}
          <div style={{ marginTop: 20 }}>
            <Card bordered={false} style={{ textAlign: 'center' }}>
              <Button type="link" block>Update Profile</Button>
              <Button type="link" block>Share Latest News</Button>
              <Button type="link" block>Ready for Competition</Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
