import React, { useState } from 'react';
import { Button } from 'antd';

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
    setUser({
      ...user,
      favorites: [...user.favorites, videoId],
    });
  };

  return (
    <div>
      <h