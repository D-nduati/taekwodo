import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Input, Button, List, Card, Space, Spin, message } from 'antd';
import './Educate.css';

const EducationModule = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const combinedQuery = 'taekwondo|tkd|korean martial arts|kickboxing';

  const fetchVideos = useCallback(async () => {
    setLoading(true); // Show loader

    try {
      const query = searchQuery.trim() !== '' ? `${combinedQuery}|${searchQuery.trim()}` : combinedQuery;

      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query,
          type: 'video',
          key: 'AIzaSyD9KTWtU9xb-T5dVCi3-6n83OHKv5O6yI8',
          pageToken: nextPageToken,
        },
      });

      setVideos((prevVideos) => [...prevVideos, ...response.data.items]);
      setNextPageToken(response.data.nextPageToken || '');
    } catch (error) {
      message.error('Error fetching videos. Please try again later.');
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false); // Hide loader
    }
  }, [nextPageToken, searchQuery]); // Only re-fetch when pageToken or search query changes

  useEffect(() => {
    fetchVideos(); // Initial video load
  }, []); // Empty array to run only once when component mounts

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      setVideos([]); // Clear existing videos
      setNextPageToken(''); // Reset next page token
      fetchVideos(); // Fetch new videos
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLoadMore = () => {
    fetchVideos(); // Load more videos when the button is clicked
  };

  return (
    <div className="education-container">
      <h2 className="education-heading">Taekwondo Educational Videos</h2>

      <Space direction="vertical" size="middle" className="search-section">
        <Input
          placeholder="Search martial arts videos"
          value={searchQuery}
          onChange={handleInputChange}
          onPressEnter={handleSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </Space>

      {/* Display loading spinner while fetching */}
      {loading && <Spin size="large" className="loading-spinner" />}

      {/* Video List */}
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={videos}
        renderItem={(video) => (
          <List.Item>
            <Card
              title={video.snippet.title}
              bordered={false}
              hoverable
              className="video-card"
            >
              <iframe
                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                allowFullScreen
                title={video.snippet.title}
                frameBorder="0"
                width="100%"
                height="150"
              />
              <p>{video.snippet.description.slice(0, 100)}...</p>
            </Card>
          </List.Item>
        )}
      />

      {/* Load More Button */}
      {nextPageToken && (
        <div className="load-more-container">
          <Button type="primary" onClick={handleLoadMore} loading={loading}>
            Load More Videos
          </Button>
        </div>
      )}
    </div>
  );
};

export default EducationModule;
