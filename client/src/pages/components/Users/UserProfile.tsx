import React, { useState } from 'react';
import { Button, List, Typography, Card, Space, Divider } from 'antd';

const { Title, Text } = Typography;

interface User {
  id: string;
  name: string;
  favorites: string[];
}

interface Video {
  id: string;
  title: string;
  description: string;
}

const UserProfile = () => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Doe',
    favorites: [],
  });

  const [videos, setVideos] = useState<Video[]>([
    {
      id: '1',
      title: 'Taekwondo Basics',
      description: 'Learn the fundamentals of Taekwondo',
    },
    {
      id: '2',
      title: 'Taekwondo Advanced',
      description: 'Take your Taekwondo skills to the next level',
    },
  ]);

  const handleFavorite = (videoId: string) => {
    if (!user.favorites.includes(videoId)) {
      setUser({
        ...user,
        favorites: [...user.favorites, videoId],
      });
    }
  };

  const renderFavoriteVideos = () => {
    return user.favorites.length > 0 ? (
      <List
        bordered
        dataSource={user.favorites.map((id) =>
          videos.find((video) => video.id === id)
        )}
        renderItem={(video) => (
          <List.Item key={video?.id}>
            <Text strong>{video?.title}</Text> - {video?.description}
          </List.Item>
        )}
      />
    ) : (
      <Text>No favorite videos selected yet.</Text>
    );
  };

  return (
    <div>
      <Title level={2}>User Profile</Title>
      <Card>
        <Title level={4}>Name: {user.name}</Title>
        <Divider />
        <Title level={4}>Available Videos</Title>
        <List
          grid={{ gutter: 16, column: 2 }}
          dataSource={videos}
          renderItem={(video) => (
            <List.Item key={video.id}>
              <Card title={video.title}>
                <p>{video.description}</p>
                <Button
                  type="primary"
                  onClick={() => handleFavorite(video.id)}
                  disabled={user.favorites.includes(video.id)}
                >
                  {user.favorites.includes(video.id) ? 'Favorited' : 'Favorite'}
                </Button>
              </Card>
            </List.Item>
          )}
        />
        <Divider />
        <Title level={4}>Favorite Videos</Title>
        {renderFavoriteVideos()}
      </Card>
    </div>
  );
};

export default UserProfile;
