import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Input, Button, List, Card, Space, Spin, message } from 'antd';
import VideoRating from './VideoRating';
import VideoUpload from './VideoUpload';
import VideoFilter from './VideoFilter';
import DiscussionBoard from './DiscussionBoard';
import './Educate.css';

const EducationModule = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('title');

  const combinedQuery = 'taekwondo|tkd|korean martial arts|kickboxing';

  const fetchVideos = useCallback(async (reset = false) => {
    setLoading(true);

    try {
      let query = searchQuery.trim() !== '' ? `${combinedQuery}|${searchQuery.trim()}` : combinedQuery;

      // Add filter to query if not 'all'
      if (filter !== 'all') {
        query += ` ${filter}`;
      }

      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          maxResults: 10,
          q: query,
          type: 'video',
          key: 'AIzaSyD9KTWtU9xb-T5dVCi3-6n83OHKv5O6yI8',
          pageToken: reset ? '' : nextPageToken,
        },
      });

      if (reset) {
        setVideos(response.data.items);
        setNextPageToken(response.data.nextPageToken || '');
      } else {
        setVideos(prev => [...prev, ...response.data.items]);
        setNextPageToken(response.data.nextPageToken || '');
      }
    } catch (error) {
      message.error('Error fetching videos. Please try again later.');
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  }, [nextPageToken, searchQuery, filter]);

  useEffect(() => {
    fetchVideos(true);
  }, [filter]);

  useEffect(() => {
    const filtered = filter === 'all'
      ? videos
      : videos.filter(video => video.snippet.title.toLowerCase().includes(filter.toLowerCase()));

    const sorted = [...filtered].sort((a, b) => {
      if (sort === 'title') return a.snippet.title.localeCompare(b.snippet.title);
      return a.snippet.description.localeCompare(b.snippet.description);
    });

    setFilteredVideos(sorted);
  }, [videos, filter, sort]);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      fetchVideos(true);
    }
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleLoadMore = () => {
    fetchVideos();
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSortChange = (value) => {
    setSort(value);
  };

  return (
    <div className="education-container">
      <div className="education-header">
        <h2>Taekwondo Education Hub</h2>
        <div className="search-upload-section">
          <Space direction="horizontal" className="search-section">
            <Input
              placeholder="Search martial arts videos"
              value={searchQuery}
              onChange={handleInputChange}
              onPressEnter={handleSearch}
              style={{ width: 300, marginRight: 0 }}
              size="middle"
            />
            <Button type="primary" onClick={handleSearch} size="middle" style={{ marginLeft: 0 }}>
              Search
            </Button>
            <div style={{
              flex: 1,
              position: 'sticky',
              marginTop: '20px',
              height: 'fitContent'
            }}>
              <VideoFilter
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
                currentFilter={filter}
                currentSort={sort}
              />
            </div>
          </Space>
          <VideoUpload />
        </div>
      </div>

      <div className="education-content">
        {/* <div className="video-section"> */}

<div>
          {/* Video List */}
          {loading && <Spin size="large" className="loading-spinner" />}

          <List
            grid={{ gutter: 16, column: 3 }}
            dataSource={filteredVideos}
            renderItem={(video) => (
              <List.Item onClick={() => handleVideoSelect(video)}>
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

        <div className="video-details-section">
          {selectedVideo && (
            <>
              <div className="selected-video">
                <h3>{selectedVideo.snippet.title}</h3>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                  allowFullScreen
                  title={selectedVideo.snippet.title}
                  frameBorder="0"
                  width="100%"
                  height="400"
                />
                <p>{selectedVideo.snippet.description}</p>
              </div>

              <VideoRating video={selectedVideo} />
            </>
          )}

          <DiscussionBoard
            videoId={selectedVideo?.id.videoId}
            style={{ marginTop: '20px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default EducationModule;