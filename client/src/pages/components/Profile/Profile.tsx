import React from 'react';
import { Card, Avatar, List, Layout,Typography } from 'antd';
import { UserOutlined, TrophyOutlined } from '@ant-design/icons';


const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const achievements = ['Black Belt - 2nd Dan', 'National Champion 2023', 'Taekwondo Instructor'];

  return (
    <div className="profile-page">
     
      <Card bordered={false} style={{ maxWidth: 600, margin: 'auto' }}>
        <Avatar size={100} icon={<UserOutlined />} />
        <Title level={2}>John Doe</Title>
        <Text type="secondary">Taekwondo Enthusiast | Instructor</Text>

        <Card title="Achievements" bordered={false} style={{ marginTop: 20 }}>
          <List
            itemLayout="horizontal"
            dataSource={achievements}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<TrophyOutlined style={{ fontSize: 24, color: '#fadb14' }} />}
                  title={item}
                />
              </List.Item>
            )}
          />
        </Card>
      </Card>
    </div>
  );
};

export default Profile;
