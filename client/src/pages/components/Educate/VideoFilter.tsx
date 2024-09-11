import React, { useState } from 'react';
import { Select, Button } from 'antd';

interface Video {
  id: string;
  title: string;
  description: string;
  category: string;
}

const VideoFilter = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [filter, setFilter] = useState<string>('all');
  const [sort, setSort] = useState<string>('title');

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const handleSortChange = (value: string) => {
    setSort(value);
  };

  const filteredVideos = videos.filter((video) => {
    if (filter === 'all') return true;
    return video.category === filter;
  });

  const sortedVideos = filteredVideos.sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title);
    return a.description.localeCompare(b.description);
  });

  return (
    <div>
      <Select value={filter} onChange={handleFilterChange}>
        <Select.Option value="all">All</Select.Option>
        <Select.Option value="beginner">Beginner</Select.Option>
        <Select.Option value="intermediate">Intermediate</Select.Option>
        <Select.Option value="advanced">Advanced</Select.Option>
      </Select>
      <Select value={sort} onChange={handleSortChange}>
        <Select.Option value="title">Title</Select.Option>
        <Select.Option value="description">Description</Select.Option>
      </Select>
      <ul>
        {sortedVideos.map((video) => (
          <li key={video.id}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};