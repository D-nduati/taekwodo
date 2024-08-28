import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Button, List, Card, Space } from 'antd';
import './Educate.css';


const EducationModule = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const fetchVideos = async () => {
    try {
      let combinedQuery = 'taekwondo|tkd|korean martial arts|kickboxing';
      if (searchQuery.trim() !== '') {
        combinedQuery += `|${searchQuery.trim()}`;
      }

      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: combinedQuery,
          type: 'video',
          key: 'AIzaSyD9KTWtU9xb-T5dVCi3-6n83OHKv5O6yI8',
          pageToken: nextPageToken
        }
      });

      if (nextPageToken) {
        setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      } else {
        setVideos([...response.data.items]);
      }

      setNextPageToken(response.data.nextPageToken);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  useEffect(() => {
    fetchVideos(); // Initially load videos
  }, [fetchVideos]); // Include fetchVideos in the dependency array

  const handleLoadMore = () => {
    fetchVideos(); // Load more videos with the same search query
  };

  const handleSearch = () => {
    // Trigger search only if searchQuery is not empty
    if (searchQuery.trim() !== '') {
      setVideos([]); // Clear existing videos
      setNextPageToken(''); // Reset next page token
      fetchVideos(); // Fetch new videos based on the updated query
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="education-container">
      
      <h2 className="education-heading">Taekwondo Educational Videos</h2>
      <Space direction="vertical" size="middle">
        <Input
          placeholder="Search"
          value={searchQuery}
          onChange={handleInputChange}
          onPressEnter={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Space>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={videos}
        renderItem={(video) => (
          <List.Item>
            <Card
              title={video.snippet.title}
              bordered={false}
              style={{ width: 300 }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allowFullScreen
                title={video.snippet.title}
                frameBorder="0"
                width="100%"
                height="150"
              />
              <p>{video.snippet.description}</p>
            </Card>
          </List.Item>
        )}
      />
      {nextPageToken && (
        <Button type="primary" onClick={handleLoadMore}>
          Load More Videos
        </Button>
      )}
    </div>
  );
};

export default EducationModule;