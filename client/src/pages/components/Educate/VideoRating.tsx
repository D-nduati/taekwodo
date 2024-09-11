import React, { useState } from 'react';
import { Rate, Input, Button } from 'antd';

interface Video {
  id: string;
  title: string;
  description: string;
  rating: number;
  reviews: string[];
}

const VideoRating = () => {
  const [video, setVideo] = useState<Video>({
    id: '1',
    title: 'Taekwondo Basics',
    description: 'Learn the fundamentals of Taekwondo',
    rating: 0,
    reviews: [],
  });
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleReviewChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    setVideo({
      ...video,
      rating: (video.rating + rating) / (video.reviews.length + 1),
      reviews: [...video.reviews, review],
    });
  };

  return (
    <div>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <Rate value={video.rating} onChange={handleRatingChange} />
      <Input value={review} onChange={handleReviewChange} />
      <Button onClick={handleSubmit}>Submit Review</Button>
      <ul>
        {video.reviews.map((review, index) => (
          <li key={index}>{review}</li>
        ))}
      </ul>
    </div>
  );
};