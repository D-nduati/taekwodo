import React, { useState, useEffect } from 'react';
import { Card, Avatar, List, Layout, Typography, Button,  Tag, Space, message } from 'antd';
import { Link } from 'umi';
import { UserOutlined, TrophyOutlined, SettingOutlined,  } from '@ant-design/icons';
import axios from 'axios'; 

const { Title, Text } = Typography;

const Profile: React.FC = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const userId = localStorage.getItem('userId')

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/profile/getProfileData/${userId}`);
  
        const profile = response.data[0];
  
        profile.achievements = Array.isArray(profile.achievements)
          ? profile.achievements
          : [profile.achievements];
  
        profile.skills = Array.isArray(profile.skills)
          ? profile.skills
          : [profile.skills];
  
        setProfileData(profile);
        setLoading(false);
      } catch (error) {
        message.error('Failed to load profile data');
        setLoading(false);
      }
    };
  
    fetchProfile();
  }, []);
  

  
  const handleUpdateProfile = async () => {
    try {
      await axios.put('http://localhost:5000/profile/updateProfile', profileData); 
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    }
  };


  if (loading || !profileData) {
    return <Layout style={{ minHeight: '100vh', padding: '40px 0' }}>
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        <Text>Loading...</Text>
      </div>
    </Layout>;
  }
  
  const { username, role, avatarUrl, achievements = [], skills = [] } = profileData;
  

  return (
    <Layout style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 0' }}>
    {loading && <div>loading ...</div>}
      <div className="profile-container" style={{ maxWidth: 800, margin: 'auto', backgroundColor: '#fff', borderRadius: 16, boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
        
     
        <div style={{ position: 'relative', padding: '20px', background: 'linear-gradient(90deg, #ff7e5f, #feb47b)', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
          <Avatar size={100} src={avatarUrl} icon={<UserOutlined />} style={{ border: '4px solid #fff', position: 'absolute', top: 20, left: 30 }} />
          <div style={{ marginLeft: 150 }}>
            <Title level={2} style={{ color: '#fff' }}>{username}</Title>
            <Text type="secondary" style={{ color: '#fff' }}>{role}</Text>
          </div>
          {/* <Button shape="circle" icon={<EditOutlined />} style={{ position: 'absolute', top: 20, right: 20, color: '#fff', borderColor: '#fff' }} /> */}
        </div>
        
       
        <div style={{ padding: '20px' }}>
          <Space style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
            <Button type="primary" onClick={handleUpdateProfile}>Update Profile</Button>
            <Button icon={<SettingOutlined />}>
              <Link to='/dashboard/settings'>Settings</Link>
            </Button>
          </Space>

          
          <div style={{ marginBottom: 20 }}>
            <Text strong>Skills:</Text>
            <div style={{ marginTop: 10 }}>
              {skills.map((skill: string) => (
                <Tag key={skill} color="blue" style={{ marginBottom: 8 }}>{skill}</Tag>
              ))}
            </div>
          </div>

        
          <Card title="Achievements" bordered={false}>
            <List
              itemLayout="horizontal"
              dataSource={achievements}
              renderItem={(item: string) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<TrophyOutlined style={{ fontSize: 24, color: '#fadb14' }} />}
                    title={item}
                  />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
